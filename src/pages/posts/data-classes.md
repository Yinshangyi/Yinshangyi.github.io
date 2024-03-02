---
layout: '@/templates/BasePost.astro'
title: Data Classes
description: The Scala killer feature you need in Python
pubDate: 2024-02-23
imgSrc: '/assets/images/articles/data-classes/data-classes.png'
imgAlt: 'Image post 7'
---

# Case classes: One of Scala killer features
Scala case classes are a powerful feature for modeling immutable data with minimal boilerplate code.  
By default, they provide public val parameters, making instances immutable and promoting the use of functional programming principles. Key benefits include:

- **Automatic Public Val Parameters**   
Parameters of case classes are public and immutable by default, encouraging immutability.  

- **Structural Comparison**   
Instances are compared by their values rather than by reference, thanks to automatically provided equals and hashCode methods, facilitating value-based comparison.  

- **Ease of Copying**   
The copy method allows for easy cloning of instances with modifications, supporting the immutable data pattern.  

- **Convenient Creation and Usage**   
The apply and unapply methods simplify instance creation and enable pattern matching, respectively, enhancing code readability and expressiveness.

- **Boilerplate Reduction**   
Automatically generated methods like toString, equals, and hashCode reduce the need for manual implementation, making case classes a concise option for data holding objects.


Overall, Scala case classes streamline the handling of immutable data, making them ideal for applications where immutability, pattern matching, and value-based comparison are essential.

```scala
case class Message(sender: String, recipient: String, body: String)

val message1 = Message("jen@gmail.com", "eric@gmail.com", "How are you?")
val message2 = Message("jen@gmail.com", "eric@gmail.com", "How are you?")
val messagesAreTheSame = message1 == message2  // true
```

For more details about using case classes in Scala, check out my previous blog post https://www.thedatalead.org/posts/scala-oop/, 

# Why you need them in Python?

### Reduction of Boilerplate Code
Without data classes, developers often have to write boilerplate code for initializing objects, creating __repr__, __eq__, and __hash__ methods, among others. Data classes automatically generate these special methods based on the class fields, significantly reducing the amount of code one has to write and maintain.

### Immutability Support
Data classes come with built-in support for immutability. By setting the frozen parameter to True, you can make the instances of your data class immutable. This is beneficial for creating objects that should not change after they are created, enhancing the predictability and thread-safety of your code.

### Type Hints Integration
Data classes make use of type hints, providing a way to clearly specify the intended type of each field. This integration with type hints helps with static type checking and improves code readability, making it clearer what type of data each field is supposed to hold.

### Default Values and Factory Functions
With data classes, you can easily set default values for fields or use factory functions to generate default values dynamically. This feature simplifies object initialization and provides flexibility in how instances of your data classes are created.

### Comparisons and Sorting
Data classes automatically implement comparison methods (__eq__, and optionally __lt__, __le__, __gt__, and __ge__ if the order parameter is set to True). This makes objects of your data class comparable and sortable out of the box, based on their fields, which is particularly useful when you need to manage collections of objects.

```python
from dataclasses import dataclass, field

@dataclass
class Book:
    title: str
    author: str
    pages: int = 0
    published_year: int = field(default=2021, compare=False)

book1 = Book("Python Programming", "Jane Doe", 300)
book2 = Book("Advanced Python", "John Smith", 400, 2022)
book3 = Book("Learning Python", "Emily Davis", 250)

print(book1 == book3)  # False
```

# Add sorting functionality

In the following example, we defined a Book a data class with frozen=True and order=True, which makes the Book class 100% immutable and automatically provides comparison methods (__eq__, __lt__, __le__, __gt__, and __ge__) based on the fields in their definition order.  

```python
from dataclasses import dataclass, field

@dataclass(frozen=True, order=True)
class Book:
    title: str
    author: str
    pages: int = 0

book1 = Book("Python Programming", "Jane Doe", 300)
book2 = Book("Advanced Python", "John Smith", 400, 2022)
book3 = Book("Learning Python", "Emily Davis", 250)

books = [book1, book2, book3]
sorted_books = sorted(books)

for book in sorted_books:
    print(book.title)
```
The code would output : 
- Advanced Python
- Learning Python
- Python Programming  

The books have been sorted alphabetically by title because title is the first field in the data class.

## Add a custom sorting functionality

The following code demonstrate how to define Book data class and define a custom sorting strategy.  
The idea is to define a first attribute that will be used for the sorting.  
Since Book is a frozen data classes, the correct way to set values that are not directly initialized through the __init__ parameters is by doing object.__setattr__(self, 'field_name', value) within the __post_init__ method. This approach is used to bypass the immutability constraint for the purpose of setting initial values for such fields.

```python
from dataclasses import dataclass, field

@dataclass(order=True, frozen=True)
class Book:
    sort_key: int = field(init=False, repr=False)
    title: str
    author: str
    pages: int = 0

    def __post_init__(self):
        # Set the sort_key as the negative of pages to sort by descending order
        object.__setattr__(self, 'sort_key', -self.pages)
        
book1 = Book(title="Python Programming", author="Jane Doe", pages=300)
book2 = Book(title="Advanced Python", author="John Smith", pages=400)
book3 = Book(title="Learning Python", author="Emily Davis", pages=250)

books = [book1, book2, book3]
sorted_books = sorted(books)

for book in sorted_books:
    print(f"{book.title}: {book.pages} pages")
```
We now have a fully immutable data class with an extra field for custom sorting.   
That was very concise to declare. 

# Using Pydantic for data validation
Validate the data you're working with (configuration file, data from a queue or an HTTP request) is very important and can help making your Python application more type safe.   
We can leverage Python type hints and data classes to achieve that.   

Pydantic is a data validation library in Python that uses Python type annotations to validate data.  
Pydantic's data models can be seen as an alternative to Python's built-in data classes, with the added benefit of automatic data validation and conversion.

```python
from pydantic import BaseModel, ValidationError, validator

class User(BaseModel):
    name: str
    age: int
    email: str
  
# Valid input data
user1 = User(name="John Doe", age=20, email="john@example.com")
print(user1)

# Invalid input data
try:
    user2 = User(name="Jane Doe", age=17, email="jane@example.com")
    print(user2)
except ValidationError as e:
    print(e)
```
The create of user2 fails as expected and an error is raised by Pandantic with the following error message:
*1 validation error for User
age
  Field required [type=missing, input_value={'name': 'Jane Doe', 'email': 'jane@example.com'}, input_type=dict]*

**That's pretty neat!**

We can also define custom checks on our data with Pydantic validators:

```python
from pydantic import BaseModel, ValidationError, field_validator

class User(BaseModel):
    name: str
    age: int
    email: str
    
    @field_validator('age')
    @classmethod
    def age_must_be_greater_more_or_equal_than_18(cls, age: int) -> str:
        if age < 18:
            raise ValueError('Age must be at least 18')
        return age
  
# Valid input data
user1 = User(name="John Doe", age=20, email="john@example.com")
print(user1)

# Invalid input data
try:
    user2 = User(name="Jane Doe", age= 16, email="jane@example.com")
    print(user2)
except ValidationError as e:
    print(e)
```

# Keep eveything typed!

By learning and coding in Scala (or Java), we can appreciate the importance of type safety.  
Not only it provides a great deal of safety to our program but it also give our IDE super powers.  
This is especially true when working with complex/nested data.  

Let's say we want to read and parse the following JSON configuration:
```json
{
    "name": "MyComplexApp",
    "version": 2.0,
    "database": {
        "host": "localhost",
        "port": 5432,
        "username": "user",
        "password": "pass"
    },
    "tags": ["python", "dataclass", "complex"]
}
```

Python dictionaries are great. It's easy to lead a JSON into a Python dictionary like so:
```python
data = json.load(json_config)
```

This is not type safe however. It is very easy to make a mistake and refer to a field that does not exist.
```python
data = json.load(json_config)

# ! field db does not exist
# will crash at run time.
password = data["db"]["password]
```

Let's use Python built-in dataclasses and Pydantic to solve the issue and being type-safe

**Using Python dataclasses**

```python
import dataclasses
import json
from typing import List

@dataclasses.dataclass
class DatabaseConfig:
    host: str
    port: int
    username: str
    password: str

@dataclasses.dataclass
class AppConfig:
    name: str
    version: float
    database: DatabaseConfig
    tags: List[str]

config_dict = json.loads(json_config)

# Manually constructing the DatabaseConfig object
database_config = DatabaseConfig(**config_dict.pop('database'))

# Manually constructing the App config object
app_config = AppConfig(**config_dict, database=database_config)

print(app_config)
```

**Using Pydantic models**

With Pydantic, handling nested objects is more straightforward, as Pydantic can automatically parse and validate nested models.

```python
from pydantic import BaseModel
from typing import List

class DatabaseConfig(BaseModel):
    host: str
    port: int
    username: str
    password: str

class AppConfig(BaseModel):
    name: str
    version: float
    database: DatabaseConfig
    tags: List[str]

# The JSON file is directly loaded into a Pydantic model instance, including nested objects
app_config = AppConfig.model_validate_json(json_config)
print(app_config)
```

Pydantic automatically parses and validates the nested database configuration as a DatabaseConfig instance without manual intervention. This feature significantly simplifies working with complex, nested JSON data structures, making Pydantic a powerful tool for loading and validating configurations and data from external sources.

### What should you use?
Both Python dataclasses and Pydantic use Python types hints and type-safety (at compile time) will be ensured by your static type checker (MyPy or PyRight). 


### Why using Python built-in dataclasses

**Part of the Standard Library**   
Dataclasses are part of the Python standard library (from Python 3.7), therefore they require no additional dependencies. If you want to keep dependencies to the minimum, Python data classes can make sense. 

**Performance**
Since dataclasses are a part of the Python core and don't do runtime validation, they can offer better performance in scenarios where validation is not needed or is handled externally.

### Why using Pydantic

**Built-in Data Validation and Conversion** 
Pydantic models provide powerful and extensible data validation and automatic type conversion at runtime, ensuring the data fits your specified schema before you work with it.

**Error Reporting**   
Offers detailed error reporting, which can be a great help in debugging data validation related issues.

**Integration with Modern Web Frameworks**   
Pydantic is designed to work with modern Python web frameworks, especially FastAPI, making it an excellent choice for web development where data validation and serialization are very important.

**Custom Validators**   
Allows for the definition of custom validators with the @field_validator decorator, enabling complex data validation rules.

**JSON Serialization and Deserialization**
Pydantic models can directly serialize to and deserialize from JSON, making them a great choice for applications that consume or produce JSON data, such as APIs.

# Conclusion
Data classes bring a lot to the table for free!  
They significantly reduce boilerplate code for class definitions, automatically implementing methods like __init__, __repr__, __eq__, and more, based on the simple declaration of class fields.  
This makes them an excellent choice for creating simple, immutable data objects in Python, promoting cleaner, more readable, and maintainable code.

Pydantic models take data handling a step further by incorporating robust data validation and parsing capabilities. By leveraging Python type hints, Pydantic not only reduces boilerplate code but also ensures that data conforms to specified schemas, automatically handling type conversions and providing detailed error messages for invalid data

Python type hints = Type safety at compile time
Pydantic = Type safety at compile time and run time

Regardless which one you choose, you definitely should use one or the other.  
Type safety = ❤️

This is the lesson we can type from Scala and use it in our daily Python life.

```python
@dataclass
class Message:
    sender: str
    recipient: str
    body: str

message1 = Message("jen@gmail.com", "eric@gmail.com", "How are you?")
message2 = Message("jen@gmail.com", "eric@gmail.com", "How are you?")

messagesAreTheSame = message1 == message2  # This will be True
```