---
layout: '@/templates/BasePost.astro'
title: Scala 101
description: OOP with Scala
pubDate: 2024-02-23
imgSrc: '/assets/images/articles/scala-oop/thumbnail.png'
imgAlt: 'Image post 7'
---

# Quick intro
Scala is mostly known for its functional programmig features but it is a proper OOP language as well.
It's totally possible to code in Scala in a very Java style.  
As you will discover in this article doing OOP in Scala is extremly concise. Sometimes even more than in Python. 
Let's get started

# OOP Basic in Scala

## Define classes
A basic class structure consists of the class keyword followed by a name. 
Classes names should start with a capital letter.
```scala
class User

val user1 = User()
```

To instantiate a class, we invoke it as if it were a function using User(). 
While it's possible to use the new keyword explicitly with new User(), this is often omitted. 
This is all possible thanks for the apply() method which we will discuss about in a moment.

The User class comes with a default constructor that requires no arguments, as no specific constructor is provided. 

However, it's common to define a constructor and a class body. For instance, here's how you might define a class for a point:

```scala
// Scala 2 syntax
class Point(var x: Int, var y: Int) {

  def move(dx: Int, dy: Int): Unit = {
    x = x + dx
    y = y + dy
  }

  override def toString: String =
    s"($x, $y)"
}

val point1 = new Point(2, 3)
```

```scala
// Scala 3 syntax 
class Point(var x: Int, var y: Int):

  def move(dx: Int, dy: Int): Unit =
    x = x + dx
    y = y + dy

  override def toString: String =
    s"($x, $y)"
end Point

val point1 = new Point(2, 3)
```
In Scala 3, it is possible to define a class with a colon ':' instead of brakets, just like in Python 

The Point class is composed of four elements: 
- two variables, x and y
- two methods, move and toString.  

Unlike numerous other programming languages, the main constructor is directly included within the class definition (`var x: Int, var y: Int`). The move method accepts two integers as parameters and returns the Unit type `()`, which is like `void` in Java and similar languages. The toString method, in contrast, requires no parameters and produces a String. It is marked with the `override` keyword since it replaces the toString method from the AnyRef class.  
In Scala when a method takes no arguments, parenthesis are optionals. It is all up to you to use them or not.

## Constructors
Constructors can include optional parameters by assigning them a default value in the following manner:
```scala
class Point(var x: Int = 0, var y: Int = 0)

val origin = Point()  // x and y are both set to 0
val point1 = Point(1) // x is set to 1 and y is set to 0
println(point1)       // prints (1, 0)
```

In this example, both x and y are initialized with a default value of 0, eliminating the need for any arguments. 
If you wish to specify only a y value, due to the constructor's left-to-right argument processing, it's necessary to explicitly name the parameter.

```scala
class Point(var x: Int = 0, var y: Int = 0)

val point2 = Point(y = 2)
println(point2) 
```

### Mutable vs Immutable attributes
In Scala, the attributes can be either mutable or immutable.  
As it was the case for regular variables:
- `val` for immutable attributes
- `var` for mutable attributes

```scala
  class Person(val name: String, val age: Int):
    def incrementAge: Unit = age = age + 1 // does not compile
  
  class Person(val name: String, var age: Int):
    def incrementAge: Unit = age = age + 1 // does compile
```

## Private Members and Getter/Setter 
```scala
  class Point:
    private var _x = 0
    private var _y = 0
    private val bound = 100

    def x: Int = _x

    def x_=(newValue: Int): Unit =
      if newValue < bound then
        _x = newValue
      else
        printWarning()

    def y: Int = _y

    def y_=(newValue: Int): Unit =
      if newValue < bound then
        _y = newValue
      else
        printWarning()

    private def printWarning(): Unit =
      println("WARNING: Out of bounds")

  val point1 = Point()
  point1.x = 99
  point1.y = 101 
```

In this variation of the Point class, private instances _x and _y hold the data. Methods named def x and def y provide access to this private data, while def x_= and def y_= are used for validating and updating the values of _x and _y, respectively. It's important to note the unique syntax for setters, which involves appending _= to the getter's identifier, followed by the parameters.  
It is somehow similar to the @property and @life.setter annotations in Python.

It is also possible of course to use the regular Java-style setters style:

```scala
  def setX(newValue: Int): Unit =
    if newValue < bound then
      _x = newValue
    else
      printWarning()

val point1 = Point()
point1.setX(99)
```

Parameters in the primary constructor declared with val and var are public by default. However, since vals are immutable, the following operation cannot be executed.

### Named arguments
When calling methods, you can label the arguments with their parameter names like so:

```scala
def printName(first: String, last: String): Unit =
  println(first + " " + last)

printName("John", "Smith")  
printName(first = "John", last = "Smith") 
printName(last = "Smith", first = "John") 
```
Take note that the order of named arguments can be changed.  When mixing named and unnamed arguments, the unnamed ones must precede, maintaining their original sequence as per the method's parameter signature.

```scala
printName(last = "Smith", "john") // This would cause an error
```

## Objects

An object is a class that has exactly one instance. It’s initialized lazily when its members are referenced, similar to a lazy val. Objects in Scala allow grouping methods and fields under one namespace, similar to how you use static members on a class in Java, Javascript (ES6), or @staticmethod in Python.

Declaring an object is similar to declaring a class. Here’s an example of a “string utilities” object that contains a set of methods for working with strings:

```scala
object StringUtils:
  def truncate(s: String, length: Int): String = s.take(length)
  def containsWhitespace(s: String): Boolean = s.matches(".*\\s.*")
  def isNullOrEmpty(s: String): Boolean = s == null || s.trim.isEmpty
```

The object can be used as follows:

```scala
StringUtils.truncate("Chuck Bartowski", 3)  
```

For a more concise code we can import object members like so:
```scala
// import all
import StringUtils.*
truncate("Chuck Bartowski", 5)       
containsWhitespace("Sarah Walker")  
isNullOrEmpty("John Casey")    

// or just some members
import StringUtils.{truncate, containsWhitespace}
truncate("Charles Carmichael", 7)      
containsWhitespace("Captain Awesome")  
isNullOrEmpty("Morgan Grimes")         
```

Objects can also contain fields, which are also accessed like static members:

```scala
object MathConstants:
  val PI = 3.14159
  val E = 2.71828

println(MathConstants.PI)  
```

## Companion objects

An object and a class sharing the same name and declared within the same file are known as a "companion object" and a "companion class," respectively. Each can access the other's private members due to their special relationship.

Companion objects are ideal for housing methods and values that do not pertain to individual instances of the companion class. For example, in the scenario below, the Circle class possesses an area member unique to each instance. Conversely, its companion object features a calculateArea method that is (a) independent of any specific instance and (b) accessible to all instances

```scala
import scala.math.*

class Circle(val radius: Double):
  def area: Double = Circle.calculateArea(radius)

object Circle:
  private def calculateArea(radius: Double): Double = Pi * pow(radius, 2.0)

val circle1 = Circle(5.0)
circle1.area
```

In the given example, the `area` method accessible by each instance leverages the `calculateArea` method from the companion object, a bit like how a static method work in Java.  
Furthermore, `calculateArea` is private, restricting its access to external code while still being visible to instances of the `Circle` class.

## The apply method (important!)
In Scala, the apply method, often defined in a companion object, allows for creating class instances without explicitly using the new keyword. This method makes object instantiation more concise and enhances code readability.

The following code creates a Person instance through apply method. There is no need the "new" keyword!

```scala
class Person(val name: String, val age: Int)

object Person {
  def apply(name: String, age: Int): Person = new Person(name, age)
}

val person = Person("Alice", 25) 
```

## Example of basic OOP Code
Here is a little example for the different topics we've been over so far with Goku!

<img width="70%" src="/assets/images/articles/scala-oop/kamehameha.png" />

```scala
class Saiyan(var name: String, var life: Int, var powerLevel: Int) {
    
    def takeDamage(newValue: Int): Unit = {
      life -= newValue
      if life < 0 then life = 0
    }

    def status: String = s"$name's current power level is $life."

    def train: Unit =
      life += 1000
      println(s"$name has trained hard! Power level increased to $life.")

    def goSuperSaiyan: Unit =
      life *= 50
      println(s"$name has transformed into a Super Saiyan! Power level surged to $life.")

    def kamehameha(to: Saiyan): Unit =
      to.takeDamage((0.1 * powerLevel).toInt)
  }

  def main(args: Array[String]): Unit = {
    val goku = new Saiyan("Goku", 100, 500)
    println(goku.status)
    goku.train
    println(goku.status)
    goku.goSuperSaiyan
    println(goku.status)
  }
```

As a comparison here is the Python equivalent:
```python
class Saiyan:
    def __init__(self, name, life = 100, power_level):
        self._name = name
        self._life = life
        self._power_level = power_level

    @property
    def life(self):
        return self._life

    @life.setter
    def life(self, newValue):
        if newValue > 100:
            self._life = 100
        elif newValue < 0:
            self._life = 0
        else:
            self._life = newValue

    def take_damage(self, damage):
        self._life -= damage
        if self._life < 0:
            self._life = 0

    def status(self):
        return f"{self._name}'s current power level is {self._life}."

    def train(self):
        self._life += 1000
        print(f"{self._name} has trained hard! Power level increased to {self._life}.")

    def go_super_saiyan(self):
        self._life *= 50
        print(f"{self._name} has transformed into a Super Saiyan! Power level surged to {self._life}.")

    def kamehameha(self, other):
        other.takeDamage(int(0.1 * power_level))

# Example usage
if __name__ == "__main__":
    goku = Saiyan("Goku", 100, 500)
    print(goku.status())
    goku.train()
    print(goku.status())
    goku.goSuperSaiyan()
    print(goku.status())

```

Extremely similar, isn't it?
Who said Scala is hard? 
Honestly Scala can get complexed if we want it to be. But it also can be as simple as Python.   
People used to say Scala is a better Java. I actually think that Scala is a better Python!

## Inheritance in Scala
While inheritance is not typically encouraged in Scala programming and modern approaches to OOP in general. We are gonna go over how to implement inheritance in Scala.

Inheritance is well known concept in Object-Oriented Programming (OOP). It allows a class to use the attributes and behaviors (fields and methods) of a parent class. 

This is how you implement class inheritance.

```scala
class Pet(val name: String, var age: Int)

class Dog(name: String, age Int, val breed: String) extends Pet(name, age)
```

Note how I didn't need to redefined the name and age parameter in the Dog constructor. They have already been defined in the Pet constructor. There is no need to redeclare them. This is why there no `var` or `val`keywords before name and age in the Dog constructor.  
If for whatever reason you wish to redefine them. You should add the keyword overrride before that.

```scala
class Pet(val name: String, var age: Int)

class Dog(override valname: String, age Int, val breed: String) extends Pet(name, age)
```
Pointless. But possible 😊.

Now a more practical example.

```scala
  class Fighter(val name: String, var life: Int, var powerLevel: Int) {

    def takeDamage(newValue: Int): Unit = {
      life -= newValue
      if life < 0 then life = 0
    }

    def status: String = s"$name's current power level is $powerLevel."

    def punchAndKick(to: Fighter): Unit = to.takeDamage((0.1 * powerLevel).toInt)
  }

  class Saiyan(name: String, life: Int, powerLevel: Int) extends Fighter(name, life, powerLevel) {

    def superSaiyanTransformation(): Unit = {
      powerLevel *= 50
      println(s"$name has transformed into a Super Saiyan! Power level is now $powerLevel.")
    }

    override def status: String = super.status + " He is a Super Saiyan."
    
  }

  def main(args: Array[String]): Unit = {
    val yamcha = Fighter("Yamcha", 100, 50)
    println(yamcha.status)
    val goku = Saiyan("Goku", 100, 500)
    println(goku.status)
 
  }
```

Note the override keyword to override the status method.

### Multiple inheritance  

Scala does not support multiple inheritance in the traditional sense, where a class can directly inherit from more than one superclass. This restriction is quite common in many OOP languages because multiple inheritance can lead to various complications. 

That being said, Scala offers a powerful alternative to multiple inheritance through a feature called traits.
They are very similar to Java interfaces.

## Scala special notations

### Infix notation

In Scala, the infix notation is a syntactic sugar that allows a method with one parameter to be called without dot notation or parentheses!  
Making the code more readable, especially when the method represents an operation between two items. This feature is particularly useful for defining or using methods that act like operators.

Example of Infix Notation
Consider a class Counter with a method add that takes one parameter:

```scala
class Counter(val count: Int) {
  infix def add(amount: Int): Counter = new Counter(count + amount)
}

val counter = new Counter(10)
val newCounter = counter add 5 
```
That's pretty cool! And very close to English language.

```scala
class Person(val name: String, var age: Int, val gender: String):
    infix def !(person: Person): Unit = s"${name} is getting in 
      relationship with ${person.name}"

def main(args: Array[String]): Unit = {
  val jen = Person("Jen", 30, "Female")
  val eric = Person("Eric", 32, "Male")
  jen ! eric
}
```

You can see that the "!" character is a valid operator and this syntax works.  

It is used by the framework Akka to send messages to differents actors (for distributed applications):

```scala
val system = ActorSystem("MyActorSystem")

val myActor = system.actorOf(Props[MyActor], name = "myActor")

// This send a message to the defined actor
myActor ! "Hello, actor"
```
Understanding what an actor is is outside the scope of this article but this is just to show the infix notation is used in popular frameworks and if used properly can make the code very concise.

### Unary notation
Unary notation is used for methods that do not take parameters and are used to simulate prefix operators like -, +, !, and ~. In Scala, you can define unary operators for your classes by prefixing the method name with unary_.

Example of Unary Notation
This Scala example defines a Player class with a username and an active state. It uses unary notation to define a method `unary_!` that toggles the player's active state. 

```scala
class Player(val username: String, var active: Boolean):
  def unary_! = {
    active = !active
  }

def main(args: Array[String]): Unit = {
  val player = new Player("user1", true)
  println(player.active) // Output: State is true

  !player // Toggles the state to false
  println(player.active) // Output: State is false
}
```

## Traits

Traits are used to share interfaces and fields between classes. They are similar to Java 8’s interfaces. Classes and objects can extend traits, but traits cannot be instantiated and therefore have no parameters.

```scala
trait MakesSound {
  def sound(): String
}

trait CanMove {
  def move(): String
}

class Dog extends MakesSound with CanMove {
  def sound(): String = "Woof!"
  def move(): String = "Runs"
}

class Fish extends CanMove {
  def move(): String = "Swims"
}
```

As you can see, like in Java, traits can be used if some kind of multiple inheritance is need. 
They are very conveniant to define contract interfaces and define how a class should behave.

```scala
 trait PredictionService:
    def predictNextMoviesToWatch(user: User): List[Movie]
    
  class PredictionServiceGCPVertexAI extends PredictionService {
    override def predictNextMoviesToWatch(user: User): List[Movie] = 
      // return prediction
  }

  def main(args: Array[String]): Unit = {
    val predictionService: PredictionService = PredictionServiceGCPVertexAI()
    val predictions = predictionService.predictNextMoviesToWatch()
  }
```

Interfaces are missing in Python to define contract.
Abstract classes can be used in Python to implement something similar.
```python
class PredictionService(ABC):
    @abstractmethod
    def predictNextMoviesToWatch(self, user: User) -> List[Movie]:
        pass

class PredictionServiceGCPVertexAI(PredictionService):
    def predictNextMoviesToWatch(self, user: User) -> List[Movie]:
        # return prediction

if __name__ == "__main__":
    user = User() 
    prediction_service = PredictionServiceGCPVertexAI()
    predictions = prediction_service.predictNextMoviesToWatch(user)
```

## Abstract classes

When you want to write a class with abstract members, you can either create a trait or an abstract class.  
You might wonder which one to use...  
Well in most situations you’d use traits, but there are two situations where it’s better to use an abstract class than a trait:
- You want to create a base class that takes constructor arguments (used to be case prior Scala 3, you can create trait with arguments)
- The code will be called from Java code

```scala
abstract class Pet(name: String):
  def greeting: String
  override def toString = s"My name is $name, I say $greeting, and I’m $age"

class Dog(name: String) extends Pet(name):
  val greeting = "Woof"

val d = Dog("Fido", 1)
```

## Anonymous classes

We just mentioned that we cannot instanciate traits directly.  
In order to do so, we need to define a class that implements the given trait and instantiate this class.  
That can be achieved by the following code:

```scala
trait Greeter {
  def greet(name: String): Unit
}

class FormalGreeter extends Greeter {
  def greet(name: String): Unit = println(s"Good day, $name.")
}

val greeter = new FormalGreeter()
greeter.greet("Jen")  
```

That's great and simple however if we only have one class that implement the given interface, we might not want to define that class. It is possible to do the following:

```scala
 trait Greeter {
    def greet(name: String): Unit
  }

  val greeter = new Greeter {
    def greet(name: String): Unit = println(s"Good day, $name.")
  }
  greeter.greet("Jen")
```

## Enums

Enums can be used to define a type that consists of a finite set of named values. They are be used for instance to define sets of constants, like the months in a year, the days in a week, directions like north/south/east/west, and more.

As an example, these enumerations define sets of attributes related to pizzas:

```scala
enum CrustSize:
  case Small, Medium, Large

enum CrustType:
  case Thin, Thick, Regular

enum Topping:
  case Cheese, Pepperoni, BlackOlives, GreenOlives, Onions
```

To use them in other code, first import them, and then use them:

```scala
import CrustSize.*
val currentCrustSize = Small
```

Enum values can be compared using == and also watched on:

```scala
if currentCrustSize == Large then
  println("This is a big pizza")

currentCrustSize match
  case Small => println("small")
  case Medium => println("medium")
  case Large => println("large")
```

Enumerations can also be parameterized:
```scala
enum Color(val rgb: Int):
  case Red   extends Color(0xFF0000)
  case Green extends Color(0x00FF00)
  case Blue  extends Color(0x0000FF)
```

They also can have members :

```scala
enum Planet(mass: Double, radius: Double):
  private final val G = 6.67300E-11
  def surfaceGravity = G * mass / (radius * radius)
  def surfaceWeight(otherMass: Double) =
    otherMass * surfaceGravity

  case Mercury extends Planet(3.303e+23, 2.4397e6)
  case Earth   extends Planet(5.976e+24, 6.37814e6)
```




## Case Classes
Case classes are an important feature of Scala.  
They allow us to create **immutable** classes with few useful methods we get for free (especially for compare case classes together).  
Case classes are good for modeling immutable data.  
They are very often used with pattern matching.

To define a basic case class, you need the `case class` keywords, a name for the class, and a list of parameters (which can be empty):

```scala
case class Book(isbn: String)

val harryPotter = Book("978-0486282115")
```

While it's common not use it, you can still explicitly use the `new` keyword, as in `new Book()`, to instantiate a case class. This is because case classes come with an `apply` method that handles object creation as we mentioned earlier

Furthermore, when you define a case class with parameters, those parameters are automatically public `val`.

```scala
case class Message(sender: String, recipient: String, body: String)
val message1 = Message("jen@gmail.com", "eric@gmail.com", "How are you?")

println(message1.sender)  
message1.sender = "clara@gmail.com"  // this will not compile
```

You cannot change the value of message1.sender since it's a val (immutable). While it's possible to use var in case classes, doing so is generally strongly advised against.

### Comparison of case classes
Instances of case classes are compared by structure and not by reference:

```scala
case class Message(sender: String, recipient: String, body: String)

val message1 = Message("jen@gmail.com", "eric@gmail.com", "How are you?")
val message2 = Message("jen@gmail.com", "eric@gmail.com", "How are you?")
val messagesAreTheSame = message1 == message2  // true
```

As you may know, `messagesAreTheSame` would be equal to true if Message was not a case class but a regular class and the method equals was not implemented.
So we get the method equals for free!

### Copying case classes
Creating a (shallow) copy of a case class instance is straightforward with the copy method. This method also allows for optional modification of the constructor arguments.

```scala
case class Message(sender: String, recipient: String, body: String)
val message1 = Message("jen@bgmail", "eric@gmail.com", "Hello there!")
val message2 = message1.copy(sender = message1.recipient, recipient = "claire@bourgogne.fr")
message2.sender  // eric@gmail.com
message2.recipient // jen@bgmail
message52.body  // "Hello there!"
```

The recipient of message1 is used as the sender of message2 but the body of message1 was copied directly.

Case classes in Scala automatically provide the following methods:

**equals and hashCode**  
Enable value-based comparison and hashing  

**toString**  
Gives a string representation of the instance

**copy**  
Allows creating modified copies of instances

**apply**  
Facilitates object creation without new   

**unapply**  
Supports pattern matching by extracting instance parameters (more on a next article about pattern matching!)  

These methods enhance usability and reduce boilerplate for immutable data types.

You can strongly encouraged to use them in Python as well!
```python
from dataclasses import dataclass

@dataclass
class Book:
    title: str
    author: str
    pages: int
    published_year: int
```

# Conclusion
As you probably found out, doing OOP 3 with Scala is even less verbose than doing in with Python.  
Python is great language. There's a lot you can do with it.
However for certain projets using a natively statically typed language make sense (better maintenance, type safety, refactoring, performance, etc...).  

Java was originally marketed as a better Java. I'm sure you can see why. It makes everything way less verbose and more immutable. Besides it has top support for functionnal programming.  
Scala syntax has evolved and it is now very close to Python. 
For a very similar syntax as Python, you get a lot of features for free.  
Read reading those articles and learning Scala will make you better engineer, no matter what language you end up using. 