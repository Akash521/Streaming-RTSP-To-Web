from onvif2 import ONVIFCamera
from zeep.transports import Transport

username='adim'
password='admin@12345'
mycam = ONVIFCamera('192.168.10.102', 80, username, password, wsdl_dir='./python-onvif2-zeep/wsdl')


media2_service = mycam.create_media2_service()

## get the streamUri
profiles = media2_service.GetProfiles()
for profile in profiles:
    o = media2_service.create_type('GetStreamUri')
    o.ProfileToken = profile.token
    o.Protocol = 'RTSP'
    uri = media2_service.GetStreamUri(o)

    dic = {'token': profile.token,
           'rtsp': uri}
    print(dic)

## get video info , 'h265' or 'h264', 'width' 'height' 'gop' ....
configurations = media2_service.GetVideoEncoderConfigurations()

for configuration in configurations:
    if configuration['Encoding'].lower() == 'h264' or configuration['Encoding'].lower() == 'h265':
        width = configuration['Resolution']['Width']
        height = configuration['Resolution']['Height']
        dic = {'token': configuration['token'],
               'encoding': configuration['Encoding'],
               'ratio': "{}*{}".format(width, height),
               'fps': configuration['RateControl']['FrameRateLimit'],
               'bitrate': configuration['RateControl']['BitrateLimit'],
               'gop': configuration['GovLength'],
               'profile': configuration['Profile'],
               'quality': configuration['Quality']}
    else:
        dic = {'token': configuration['Name'], 'encoding': configuration['Encoding']}

    print(dic)