---
layout: '@/templates/BasePost.astro'
title: Scala 101
description: Learn the very basics of Scala 3
pubDate: 2024-02-018
imgSrc: '/assets/images/articles/scala-101-1.png'
imgAlt: 'Image post 7'
---

# Quick intro
Scala is a mix of Functional and Object oriented programming.     
This makes it a very unique language.  
Just like Kotlin and Java it compiles to Java Byte code. Due to that all the Java ecosystem is accessible when we develop in Scala.  
Because of this coding in Scala can be very gradual and iterative.  
Scala can be used as a better Java (very OOP!) or being used as pure Functional Language. Or a mix of both! 

# Learn the basic syntax
Enough with the intro. Let's dive into the Scala 3 syntax.

## Basics
### Variable declaration
There are two ways to declare variables in Scala.
```scala
val myValue: Int = 10
```  
When you declare a variable with val, you're creating an immutable reference.  
This means that once a val is initialized with a value, you cannot change or reassign it to reference a different value. It's similar to declaring a variable as final in Java

```scala
var myValue: Int = 10
```  
Declaring a variable with var creates a mutable reference.  
This allows you to reassign the variable to a different value in the future. While var provides flexibility, it can also introduce mutability into your code. We will see later why we usually want to avoid mutability in Scala and in Functional Programming in general

### Type Inference
```scala
val name = "Jenny"
```
The compiler is capable of identifying that name is a String. This mechanism works in a same way for methods.
```scala
def squareOf(x: Int) = x * x
```

### Methods
Methods are declared using the def keyword, which is succeeded by a name, one or more parameter lists, a specified return type, and the method's body.
```scala
def add(x: Int, y: Int): Int = {
  x + y
}
println(add(1, 2))
```
In Scala 3, it is possible to define methods with an indentation based syntax (and no brackets) just like in Python!
```scala
def add(x: Int, y: Int) =
  x + y
println(add(1, 2))
```
Here you can see the return type in inferred.

There is no need for the return keyword in Scala. Scala methods automatically return the value of the last expression in the method body, making the explicit use of return unnecessary.  
When the method is one liner, it is possible to write like so:
```scala
def add(x: Int, y: Int): Int = x + y
println(add(1, 2))
```

A method can take multiple parameter lists:
```scala
def addThenMultiply(x: Int, y: Int)(multiplier: Int): Int = 
  (x + y) * multiplier
  println(addThenMultiply(1, 2)(3)) 
```

### Functions
Functions are first-class values in Scala. They can be assigned to variables, passed as arguments to other functions, and returned from functions. 

A function in Scala is an instance of a trait, such as Function1, Function2, etc., depending on the number of parameters it takes. For instance, a function that takes two parameters and returns a value is an instance of Function2.
```scala
val sum: Function2[Int, Int, Int] = new Function2[Int, Int, Int] {
  def apply(a: Int, b: Int): Int = a + b
}
```
That is very verbose but do not worry! Scala provides with a much more concise way of declaring functions.
```scala
val sum = (a: Int, b: Int) => Int => a + b
```

## Control structures

### If/else
```scala
if x < 0 then
  println("negative")
else if x == 0 then
  println("zero")
else
  println("positive")
```
Once again, basically Python simplicity!

### For loops
The general syntax of a for loop is:
```scala
val colorList = List("R", "G", "B")
for (color <- colorList) do
    println(color)
```

In a for loop, you can include if statements to filter results. These if statements are called guards. For example, to print numbers from a list that are bigger than 2:
```scala
val ints = List(1, 2, 3, 4, 5)
for i <- ints if i > 2 do
  println(i)
```

In a loop, you can go through more than one set of values and use conditions to filter what gets processed. For example, this loop goes through numbers 1 to 5 and letters a to c. But, it only prints when the number is 3 and the letter is b, thanks to two special conditions called guards.
```scala
for
  i <- 1 to 5
  j <- 'a' to 'c'
  if i == 3
  if j == 'b'
do
  println(s"i = $i, j = $j")   
```

### For expressions
The for keyword becomes even more powerful when paired with yield instead of do. This combination forms for expressions, which are designed to compute and produce results.

To illustrate, consider the same list of integers from the earlier example. The following code generates a new list by doubling the values of each element from the original list:"

It is similar to Python comprehension list. The point is have the iteration as an expression and operate with immutable values.
```scala
val doubles = for i <- ints yield i * 2
```

Here's another example that uses for expressions to create a new list containing the squares of all even numbers.
```scala
val numbers = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
val evenSquares = for n <- numbers if n % 2 == 0 yield n * n 
```

### Match expressions
Scala has a match expression just like Java does:
```scala
val i = 1
i match
  case 1 => println("one")
  case 2 => println("two")
  case _ => println("other")
```
This is VERY basic use of the match expression. Scala is able to do very advanced and complex pattern matching which will be discussed in a next article. Pattern matching is an important aspect of functional programming in Scala.

#### Try/Catch/Finally
Scala's try/catch/finally allows you to handle errors. It's like Java's way of doing it but uses a format that matches Scala's pattern matching style which is more elegant.
```scala
try
  exportData(text)
catch
  case nfe: NumberFormatException => println("NumberFormatException")
  case ioe: IOException => println("IOException")
finally
  println("Clean up resources")
```

#### While loops
Scala includes a while loop feature. Here's how it looks in a simple one-liner:
```scala
while x >= 0 do x = f(x)
```

## Everything is an expression
In Scala everything is an expression. It means everything can be reduced to a value
```scala
val age = 30
val ageRange = if age < 20 then "Young" else "Old"
val multilineAngeRange =  
  if age < 18 then "Not adult" 
  else if age < 30 then "Adult"
  else "Senior"
```
This makes the code very readable and more straight forward than the elvis operator often used in Java and JavaScript
```javascript
// JavaScript
const ageRange = age < 20? "Young" : "Old"
```
With this very simple expression, you can already see a potential paradigm shift and see everything as an expression #functionalProgramming.

### Code blocks
Code blocks are expressions between curly braces. The last value of the code block is the returned value of the block.  
Here in an example that uses a code block to calculate the sum of numbers from 1 to 10 using a while loop.  
It encapsulate the logic within a code block and print the result.
```scala
val sum = {
  var total = 0
  var i = 1
  while (i <= 10) {
    total += i
    i += 1
  }
  total
}
```
Once again, there is no need to specify the type of the code block (which is obviously Int). The compiler infers the type by itself. Who said statically typed language need to be verbose? 😊 

# Take away of this intro
Scala syntax is very concise, sometimes even more than Python (especially for OOP code).   

Python code:
```python
class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def is_adult(self) -> bool:
        return self.age >= 18

person = Person("Alice", 22)
print(person.is_adult())
```

Scala code:
```scala
class Person(val name: String, val age: Int):
  def isAdult: Boolean = age >= 18

val person = Person("Alice", 22)
println(person.isAdult)
```

But more on that later in the next article!