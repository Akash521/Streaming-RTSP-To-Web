class Student:
    def __init__(self,name): 
        self.name=name

    def get_name(self):
        return self.name
    



obj = Student("Akash")    
print(obj.get_name())