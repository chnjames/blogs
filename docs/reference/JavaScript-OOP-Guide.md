---
title: JavaScript中的面向对象编程（OOP） - 终极指南
sticky: 1
tags:
 - 前端开发
 - JavaScript
categories:
 - 前端
 - JavaScript
date: 2024-10-15
hideComments: false
---

#### 什么是 `OOP`（面向对象编程）？

**面向对象编程**是一种通过创建对象来解决问题的方法。

#### `OOP` 中的术语

| 术语                          | 解释                                             | `OOP` 支柱 |
| ----------------------------- | ------------------------------------------------ | ---------- |
| `Inheritance`（继承）         | 一个类从另一个类获取属性和方法                   | **是**     |
| `Polymorphism`（多态）        | 不同对象可以以相同的方式响应相同的消息           | **是**     |
| `Encapsulation`（封装）       | 将数据和方法封装在对象内部，保护数据不被直接访问 | **是**     |
| `Abstraction`（抽象）         | 隐藏内部细节，仅展示必要的信息                   | **是**     |
| `Class`（类）                 | 创建对象的模板或蓝图                             | 否         |
| `Object`（对象）              | 类的实例，包含属性和方法                         | 否         |
| `Attribute`（属性）           | 对象的特征或状态                                 | 否         |
| `Method`（方法）              | 对象的行为或功能                                 | 否         |
| `Constructor`（构造函数）     | 用于初始化对象的特殊方法                         | 否         |
| `Message Passing`（消息传递） | 对象之间通过方法调用进行通信                     | 否         |

#### `Prototypes`（原型） 和 `proto`（原型链）

`JavaScript` 的对象有一个特殊的属性叫 **`prototype`**，它要么是 `null`，要么引用另一个对象。

当我们尝试从一个对象读取某个属性，而该属性不存在时，`JavaScript` 会自动从原型中获取该属性。这种机制被称为 **原型继承**。

##### **设置原型**

我们可以通过设置 `__proto__` 来设置原型。如果我们从一个对象读取一个属性，该属性不存在于对象中但存在于原型中，`JavaScript` 会从原型中获取它。如果对象中有一个方法，它会从对象中调用。如果对象中缺少该方法而原型中存在，它将从原型中调用。

**示例：**

```javascript
// 这个对象会正常运行
let p = {
    run : () => {
        console.log("run")
    }
}

p.run() // 输出: run

// 现在定义另一个对象
let a = {
    name : "subham"
}

a.run() // 输出: TypeError: a.run is not a function（a 没有 run 方法）

// 使用 __proto__ 设置原型
let b = {
    name : "subham"
}
b.__proto__ = p // 将 p 设为 b 的原型
b.run() // 输出: 运行（继承自原型 p 的 run 方法）
```

简单来说，您可以在一个对象中继承另一个对象的原型。这被称为 **原型继承**。

```javascript
// 这个对象会正常运行
let p = {
    run : () => {
        console.log("p run")
    }
}

p.run() // 输出: p run

// 现在定义另一个对象并设置原型
let b = {
    run : () => {
        console.log("b run")
    }
}
b.__proto__ = p // 将 p 设为 b 的原型
b.run() // 输出: b run
```

如果一个属性或方法已经存在于对象中，`JavaScript` 会使用该对象中的属性或方法。如果它不存在于对象中但存在于原型中，`JavaScript` 会从原型中获取。在这个例子中，由于 `b` 对象已经定义了 `run` 方法，因此会输出 '`b run`'。

#### `Classes`（类） 和 `Object`（对象）

- 在面向对象编程中，**类** 是一种特定对象中方法和变量的模板定义。
- 在面向对象编程中，**对象** 是类（或结构体）的具体实例，并已在内存中分配。

**示例：**

```javascript
// 定义类
class GoogleForm {
    submit() {
       console.log(this.name + " " + this.roll + " 表单已提交")
    }
    cancel() {
        console.log(this.name + " " + this.roll + " 表单已取消")
    }
    fill(given_name , roll) {
        this.name = given_name
        this.roll = roll
    }
}

// 创建对象
const student1Form = new GoogleForm()
student1Form.fill("Rahul" , 24) // 学生1填写表单

const student2Form = new GoogleForm()
student2Form.fill("Raj" , 25) // 学生2填写表单

student2Form.cancel() // 学生2取消表单
student1Form.submit() // 学生1提交表单
student2Form.submit() // 学生2提交表单
```

#### `Constructor`（构造函数）

在 `JavaScript` 中，**构造函数** 是一个特殊的函数，用于创建并初始化对象，设置对象的初始状态和属性。

假设他们忘记填写表单就点击提交按钮，程序会返回 `undefined`！

```javascript
class Form {
    submit() {
        console.log(this.name + ": 您的表单已提交，车次为: " + this.trainno)
    }
    cancel() {
        console.log(this.name + ": 此表单已取消，车次为: " + this.trainno)
        this.trainno = 0
    }
    fill(givenname, trainno) {
        this.name = givenname
        this.trainno = trainno
    }
}

let myForm1 = new Form()
let myForm2 = new Form()
// myForm1.fill("Gaurav", 1234)
// myForm2.fill("Rahul", 5678)

myForm1.submit()
myForm2.submit()
myForm2.cancel()

// 输出: undefined: 您的表单已提交，车次为: undefined
// 输出: undefined: 您的表单已提交，车次为: undefined
// 输出: undefined: 此表单已取消，车次为: undefined
```

**现在创建构造函数：**

```javascript
class Form {
    constructor() {
        // 构造函数初始化默认的 name 和 trainno
        this.name = "Gaurav"
        this.trainno = 0
    }
    submit() {
        console.log(this.name + ": 您的表单已提交，车次为: " + this.trainno)
    }
    cancel() {
        console.log(this.name + ": 此表单已取消，车次为: " + this.trainno)
        this.trainno = 0
    }
    fill(givenname, trainno) {
        this.name = givenname
        this.trainno = trainno
    }
}

let myForm1 = new Form()
let myForm2 = new Form()

// myForm1.fill("Gaurav", 1234)
// myForm2.fill("Rahul", 5678)

myForm1.submit()
myForm2.submit()
myForm2.cancel()

// 输出: Gaurav: 您的表单已提交，车次为: 0
// 输出: Gaurav: 您的表单已提交，车次为: 0
// 输出: Gaurav: 此表单已取消，车次为: 0
```

##### **构造函数的类型**

1. **无参构造函数**：一个没有参数的构造函数。

   ```javascript
   class Example {
       constructor() {
           this.property = "default value"; // 构造函数初始化属性为默认值
       }
   }
   ```

2. **有参构造函数**：一个带有参数的构造函数。

   ```javascript
   class Example {
       constructor(value) {
           this.property = value; // 构造函数接受一个参数并初始化属性
       }
   }
   ```

3. **拷贝构造函数**：`JavaScript` 没有像 `C++` 或 `Java` 那样的内置拷贝构造函数。然而，你可以通过创建一个方法来复制对象。

   ```javascript
   class Example {
       constructor(value) {
           this.property = value; // 构造函数接受一个参数并初始化属性
       }
       // 拷贝方法，返回一个新的 Example 对象
       copy() {
           return new Example(this.property);
       }
   }
   
   const original = new Example("original value"); // 创建一个原始对象
   const copy = original.copy(); // 通过 copy 方法复制对象
   ```

与 `C++` 等语言不同，`JavaScript` 没有**析构函数**。相反，`JavaScript` 依赖高效的垃圾回收机制，它会自动释放内存。

> **什么是析构函数？**
>
> **析构函数**就是一个特殊的方法，当对象不再需要的时候，它会自动被调用，用来清理一些对象占用的资源。例如，当你不再使用一个对象时，析构函数可以用来关闭文件、释放内存或清理其他占用的资源。
>
> **举例：**
>
> 想象你借了一本书，当你还书的时候，你需要做一些事情，比如检查书是不是完好，记录还书日期等等。**析构函数**就像你还书时自动进行的这些操作。
>
> 在一些编程语言（比如 `C++`）中，你可以明确告诉程序什么时候应该"还书"，即销毁对象。而在 `JavaScript` 中，程序会自己决定什么时候对象不再需要，并且自动处理"还书"（释放资源）的操作，这就是垃圾回收。
>
> **在`JavaScript`中的区别：**
>
> - **`C++`**：你自己定义什么时候销毁对象，并用析构函数来清理资源。
> - **`JavaScript`**：程序自动管理对象，不需要手动销毁，也不需要析构函数，因为有自动的垃圾回收机制。

#### `Inheritance`（继承）

一个类从另一个类继承属性和特性的能力称为**继承**。

如果你不知道什么是**继承**：

```javascript
class Animal {
    constructor(name, color, age) {
        this.name = name;
        this.color = color;
        this.age = age;
    }
    run() {
        console.log(this.name + ' 正在跑');
    }
    shout() {
        console.log(this.name + ' 正在叫');
    }
    sleep() {
        console.log(this.name + ' 正在睡觉');
    }
}

// 如果你是新手开发者，可能会这样做
class Monkey {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    run() {
        console.log(this.name + ' 正在跑');
    }
    shout() {
        console.log(this.name + ' 正在叫');
    }
    sleep() {
        console.log(this.name + ' 正在睡觉');
    }
    eatBanana() {
        console.log(this.name + ' 正在吃香蕉');
    }
}

const animal_1 = new Monkey('猴子', '棕色', 2);
const animal_2 = new Animal('驴', '白色', 3);

animal_1.eatBanana();
animal_2.shout();
```

如果你知道：

```javascript
// 父类 - 基类
class Animal {
    constructor(name, color , age) {
        this.name = name
        this.color = color
        this.age = age
    }
    run() {
        console.log(this.name + ' 正在跑')
    }
    shout() {
        console.log(this.name + ' 正在叫')
    }
    sleep() {
        console.log(this.name + ' 正在睡觉')
    }
}

// 子类 - 派生类
class Monkey extends Animal {
    eatBanana() {
        console.log(this.name + ' 正在吃香蕉')
    }
    // 你也可以添加新的方法
    hide() {
        console.log(this.name + ' 正在躲藏')
    }
}

const animal_1 = new Monkey('猴子', '棕色', 2)
const animal_2 = new Animal('驴', '白色', 3)

animal_1.eatBanana()
animal_1.run()
animal_1.hide()

animal_2.shout()
```

**构造函数的类型**

1. **单继承**：一个子类继承一个父类。

   ```javascript
   class Animal {
     run() {
       console.log("动物正在跑");
     }
   }
   
   class Dog extends Animal {
     bark() {
       console.log("狗正在叫");
     }
   }
   
   const dog = new Dog();
   dog.run();  // 输出: 动物正在跑
   dog.bark(); // 输出: 狗正在叫
   ```

2. **多层继承**：一个类继承自另一个类，而这个类又继承自另一个父类。

   ```javascript
   class Animal {
     eat() {
       console.log("动物正在吃");
     }
   }
   
   class Mammal extends Animal {
     sleep() {
       console.log("哺乳动物正在睡觉");
     }
   }
   
   class Dog extends Mammal {
     bark() {
       console.log("狗正在叫");
     }
   }
   
   const dog = new Dog();
   dog.eat();   // 输出: 动物正在吃
   dog.sleep(); // 输出: 哺乳动物正在睡觉
   dog.bark();  // 输出: 狗正在叫
   ```

3. **层次继承**：多个类继承自同一个父类。

   ```javascript
   class Animal {
     sound() {
       console.log("动物发出声音");
     }
   }
   
   class Dog extends Animal {
     bark() {
       console.log("狗在叫");
     }
   }
   
   class Cat extends Animal {
     meow() {
       console.log("猫在喵喵叫");
     }
   }
   
   const dog = new Dog();
   const cat = new Cat();
   
   dog.sound();  // 输出: 动物发出声音
   dog.bark();   // 输出: 狗在叫
   
   cat.sound();  // 输出: 动物发出声音
   cat.meow();   // 输出: 猫在喵喵叫
   ```

4. **多重继承**：一个子类同时继承多个父类的属性和方法。（`JavaScript` 不直接支持多重继承，但可以通过 `mixin` 实现类似的效果。）

   ```javascript
   // Mixin 1: 可以飞行
   const CanFly = (Base) => class extends Base {
     fly() {
       console.log(this.name + " 能飞");
     }
   };
   
   // Mixin 2: 可以游泳
   const CanSwim = (Base) => class extends Base {
     swim() {
       console.log(this.name + " 能游泳");
     }
   };
   
   // 基类 Animal
   class Animal {
     constructor(name) {
       this.name = name;
     }
   
     move() {
       console.log(this.name + " 正在移动");
     }
   }
   
   // 通过混合多个 Mixin 实现多重继承
   class Duck extends CanFly(CanSwim(Animal)) {
     constructor(name) {
       super(name);
     }
   
     quack() {
       console.log(this.name + " 在嘎嘎叫");
     }
   }
   
   const duck = new Duck("唐老鸭");
   duck.move();   // 输出: 唐老鸭 正在移动
   duck.fly();    // 输出: 唐老鸭 能飞
   duck.swim();   // 输出: 唐老鸭 能游泳
   duck.quack();  // 输出: 唐老鸭 在嘎嘎叫
   ```

5. **混合继承**：结合多种继承方式，通常是多层继承和多重继承的混合形式。由于 `JavaScript` 不支持多重继承，混合继承通常通过组合或 `mixin` 来实现。

   ```javascript
   // 基类 Shape
   class Shape {
     area() {
       console.log("显示形状的面积");
     }
   }
   
   // 子类 Triangle 继承自 Shape
   class Triangle extends Shape {
     area(h, b) {
       console.log((1/2) * b * h);
     }
   }
   
   // Mixin 添加 perimeter 方法
   const mixin = (Base) => class extends Base {
     perimeter() {
       console.log("计算周长");
     }
   };
   
   // EquilateralTriangle 继承自 Triangle，并通过 Mixin 添加 perimeter
   class EquilateralTriangle extends mixin(Triangle) {
     constructor(side) {
       super();
       this.side = side;
     }
   
     // 重写 area 方法
     area() {
       console.log((Math.sqrt(3) / 4) * this.side * this.side);
     }
   }
   
   const equilateralTriangle = new EquilateralTriangle(5);
   equilateralTriangle.area();        // 输出: 10.825317547305481
   equilateralTriangle.perimeter();   // 输出: 计算周长
   ```

#### 方法重写

如果在父类和子类中都定义了相同的方法，那么子类的方法会覆盖父类的方法。

一般情况下：

```javascript
class human {
    constructor(name, age, body_type) {
        this.name = name;
        this.age = age;
        this.body_type = body_type;
    }
    getName() {
        console.log("这个人的名字是: ", this.name);
    }
    getAge() {
        console.log("这个人的年龄是: ", this.age);
    }
    getBodyType() {
        console.log("这个人的体型是: ", this.body_type);
    }
}

class student extends human {}
const student_1 = new student("Subham", 24, "瘦");
student_1.getAge(); // 这个人的年龄是: 24
```

##### `super` 关键字 - 类型

`super` 关键字用于调用父类的构造函数，以访问其属性和方法。

###### 重写构造函数

```javascript
class Human {
    constructor(name, age, bodyType) {
        this.name = name;
        this.age = age;
        this.bodyType = bodyType;
    }
    getName() {
        console.log("这个人名为:", this.name);
    }
    getAge() {
        console.log("这个人的年龄是:", this.age);
    }
    getBodyType() {
        console.log("这个人的体型是:", this.bodyType);
    }
}

class Student extends Human {
    constructor() {
        super("Rahul", 80, "肥胖");
    }
}

const student1 = new Student();
student1.getName(); // 输出: 这个人名为: Rahul
```

###### 重写方法

```javascript
class Human {
    constructor(name, age, bodyType) {
        this.name = name;
        this.age = age;
        this.bodyType = bodyType;
    }
    getName() {
        console.log("这个人的名字是:", this.name);
    }
    getAge() {
        console.log("这个人的年龄是:", this.age);
    }
    getBodyType() {
        console.log("这个人的体型是:", this.bodyType);
    }
}

class Student extends Human {
    constructor() {
        super("Rahul", 80, "胖");
    }
    // 使用 super 关键字在子类中重写方法
    getAge() {
        super.getAge();
        console.log("这个学生的年龄是:", 20);
    }
}

const student1 = new Student();
student1.getAge(); // 输出: 这个人的年龄是: 80
                   // 输出: 这个学生的年龄是: 20
```

##### 方法重写的关键点

1. **相同的方法名**：子类中的方法必须与父类中的方法同名。

2. **相同的参数**：子类中的方法必须具有与父类方法相同的参数列表。

3. **`IS-A`关系**：方法重写仅发生在具有`IS-A`关系（继承）的两个类之间。

   > `IS-A`关系指的是类与类之间的继承关系。当一个类是另一个类的子类时，可以说这个子类“是”父类的一个特例。例如，`学生`类可以被视为`人`类的一个特例，因此可以说“学生是人”。这种关系使得子类可以继承父类的属性和方法，从而实现代码的复用和扩展。

4. **访问修饰符**：重写的方法可以具有较低限制的访问修饰符，但不能具有更高限制的访问修饰符。

5. **超类关键字**：您可以使用 `super` 关键字来调用父类中被重写的方法。

##### 额外说明

###### 说明 1

```javascript
class human {
    constructor() {
        console.log("人类类的构造函数");
    }
    eat() {
        console.log("人类可以吃东西");
    }
}

class student extends human {}
const student_1 = new student();
student_1.eat();
// 输出:
// 人类类的构造函数
// 人类可以吃东西
```

如果你在子类中没有显式定义构造函数，`JavaScript` 会自动为你创建一个构造函数，该构造函数会使用 `super()` 调用父类的构造函数。

像这样：

```javascript
class human {
    constructor() {
        console.log("人类类的构造函数")
    }
    eat() {
        console.log("人类可以吃东西")
    }
}
class student extends human {
    constructor(...arg) {
        super(...arg);
    }
}
const student_1 = new student()
student_1.eat()
// 输出:
// 人类类的构造函数
// 人类可以吃东西
```

###### 说明 2

```javascript
class human {
    constructor() {
        console.log("人类类的构造函数")
    }
    eat() {
        console.log("人类可以吃东西")
    }
}

class student extends human {
    constructor() {
        console.log("这是学生类的构造函数")
    }
}

const student_1 = new student();
student_1.eat();
// 输出:
// 这是学生类的构造函数
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

你必须像这样使用 `super` 关键字：

```javascript
class human {
    constructor() {
        console.log("人类类的构造函数")
    }
    eat() {
        console.log("人类可以吃东西")
    }
}

class student extends human {
    constructor() {
        super();
        console.log("这是学生类的构造函数")
    }
}

const student_1 = new student();
student_1.eat();
// 输出:
// 人类类的构造函数
// 这是学生类的构造函数
// 人类可以吃东西
```

###### 说明 3

```javascript
class human {
    constructor(name) {
        console.log("人类类的构造函数", name);
        this.name = name;
    }
    eat() {
        console.log("人类可以吃东西");
    }
}

class student extends human {
    constructor(name) {
        this.name = name; // 不允许
        super();
        console.log("学生类的构造函数", name);
    }
}

const student_1 = new student("subham");
student_1.eat();
// 输出:
// ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
```

在调用 `super` 关键字之后，你就可以使用 `this` ：

```javascript
class human {
    constructor(name) {
        console.log("人类类的构造函数", name)
        this.name = name
    }
    eat() {
        console.log("人类可以吃东西")
    }
}
class student extends human {
    constructor(name) {
        super() // 这里调用父类构造函数
        this.name = name
        console.log("学生类的构造函数", name)
    }
}
const student_1 = new student("subham")
student_1.eat()
// 输出:
// 人类类的构造函数 undefined
// 学生类的构造函数 subham
// 人类可以吃东西
```

#### 方法重载

在一个类中拥有两个或多个具有相同名称但参数（或形参）不同的方法（或函数）。

##### 我们可以在 `JavaScript` 中重载一个函数吗？

在 `JavaScript` 中，方法重载（如同其他一些语言，比如 `Java`）并不被原生支持。这意味着你不能在同一个类中定义多个名称相同但参数不同的方法。不过，你可以通过在单个方法内检查参数的数量和类型来实现类似的功能。

你不能在 `JavaScript` 中这样做：

```javascript
class Calculator {
    add(a, b) {
        return a + b;
    }

    add(a, b, c) {
        return a + b + c;
    }
}

const calc = new Calculator();
console.log(calc.add(1, 2)); // 这将返回 NaN，因为第一个 add 方法被覆盖
```

如果你想的话，你可以通过这样实现：

```javascript
class Calculator {
    add(...args) {
        if (args.length > 0) {
            return args.reduce((sum, num) => sum + num, 0);
        } else {
            throw new Error("参数无效：至少需要一个参数");
        }
    }
}

const calc = new Calculator();
console.log(calc.add(1, 2));         // 输出: 3
console.log(calc.add(1, 2, 3, 4));   // 输出: 10
console.log(calc.add());             // Error: 参数无效：至少需要一个参数
```

#### 访问修饰符

访问修饰符是一种用于设置类成员可访问性的关键字。

##### 访问修饰符的类型

1. `Public`: 被声明为公共的成员可以从任何其他类中访问。
2. `Protected`: 被声明为受保护的成员可以在同一类及其子类中访问。
3. `Private`: 被声明为私有的成员只能在同一个类中访问。

##### 可访问性表

| 修饰符                | 父类 | 子类 | 外部类 |
| --------------------- | ---- | ---- | ------ |
| `Public`（公共）      | ✔️    | ✔️    | ✔️      |
| `Protected`（受保护） | ✔️    | ✔️    | ❌      |
| `Private`（私有）     | ✔️    | ❌    | ❌      |

##### 示例

1. **公有成员**

   公有成员可以从任何地方访问。

   ```javascript
   class Parent {
       publicProperty = "我是公共的";
   
       publicMethod() {
           return "这是一个公共方法";
       }
   }
   
   class Child extends Parent {
       useParentPublic() {
           console.log(this.publicProperty);
           console.log(this.publicMethod());
       }
   }
   
   const parent = new Parent();
   const child = new Child();
   
   console.log(parent.publicProperty);  // 输出: 我是公共的
   console.log(parent.publicMethod());  // 输出: 这是一个公共方法
   child.useParentPublic();
   // 输出: 
   // 我是公共的
   // 这是一个公共方法
   ```

   在这个示例中，`publicProperty` 和 `publicMethod` 可以在以下位置访问：

   - 在 `Parent` 类内部
   - 在 `Child` 类内部
   - 在任何类外部

2. **受保护的成员（模拟）**

   在 `JavaScript` 中，我们通常使用下划线作为前缀来表示受保护的成员。它们在技术上仍然是公共的，但开发者约定不要在类或其子类之外直接访问它们。

   ```javascript
   class Parent {
       _protectedProperty = "我是受保护的";
   
       _protectedMethod() {
           return "这是一个受保护的方法";
       }
   }
   
   class Child extends Parent {
       useParentProtected() {
           console.log(this._protectedProperty);
           console.log(this._protectedMethod());
       }
   }
   
   const parent = new Parent();
   const child = new Child();
   
   child.useParentProtected();
   // 输出:
   // 我是受保护的
   // 这是一个受保护的方法
   
   // 这些方法有效，但违反了约定:
   console.log(parent._protectedProperty);
   console.log(parent._protectedMethod());
   ```

   在这种情况下：

   - `_protectedProperty` 和 `_protectedMethod` 可以在 `Parent` 类中访问
   - 它们在 `Child` 类中也可以访问（继承）
   - 从技术上讲，它们在类外部也可以访问，但这违反了约定

3. **私有成员**

   私有成员是真正私有的，只能在定义它们的类内部访问。

   ```javascript
   class Parent {
       #privateProperty = "我是私有的";
   
       #privateMethod() {
           return "这是一个私有方法";
       }
   
       usePrivate() {
           console.log(this.#privateProperty);
           console.log(this.#privateMethod());
       }
   }
   
   class Child extends Parent {
       tryToUseParentPrivate() {
           // 如果取消注释，这些操作将导致错误:
           // console.log(this.#privateProperty);
           // console.log(this.#privateMethod());
       }
   }
   
   const parent = new Parent();
   const child = new Child();
   
   parent.usePrivate();
   // 输出:
   // 我是私有的
   // 这是一个私有方法
   
   // 如果取消注释，这些操作将导致错误:
   // console.log(parent.#privateProperty);
   // console.log(parent.#privateMethod());
   // child.tryToUseParentPrivate();
   ```

   在这种情况下：

   - `#privateProperty` 和 `#privateMethod` 只能在 `Parent` 类内部访问
   - 它们在 `Child` 类中不可访问，即使 `Child` 继承自 `Parent`
   - 它们在类的外部完全不可访问

**关键要点**

1. 公有成员（默认）在任何地方都可以访问。
2. 受保护的成员（约定使用下划线 `_`）可以在类和子类中访问，但不应在类外部访问（尽管从技术上讲是可以的）。
3. 私有成员（使用 `#`）仅在定义类内可访问，无法在子类或外部访问。
4. 使用受保护的成员时，它们在可访问性方面表现得像公共成员，但开发者约定将其视为受保护的成员来使用。
5. 只有使用 `#` 语法的私有成员才能实现真正的隐私和封装。

#### `Static`

`static` 关键字为类定义一个静态方法或字段。

静态方法是属于类本身的方法，而不是属于类的具体实例的方法。

```javascript
class Animal {
    constructor(name) {
        this.name = Animal.capitalize(name);
    }

    static capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    walk() {
        console.log(`动物 ${this.name} 正在走路`);
    }
}

const animal = new Animal("lion");
animal.walk(); // 输出: 动物 Lion 正在走路

console.log(Animal.capitalize("elephant")); // 输出: Elephant
```

关键要点：

1. `capitalize` 方法使用 `static` 关键字声明为静态方法。
2. 它是在类上调用的（如 `Animal.capitalize`），而不是在实例上调用的。
3. 可以在构造函数或其他方法中使用类名来调用它。

##### 继承与静态方法

静态方法可以被子类继承：

```javascript
class Animal {
    constructor(name) {
        this.name = Animal.capitalize(name);
    }

    static capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    walk() {
        console.log(`动物 ${this.name} 正在走路`);
    }
}

class Human extends Animal {
    static greet() {
        console.log("你好！");
    }
}

const human = new Human("john");
human.walk(); // 输出: 动物 John 正在走路

console.log(Human.capitalize("sarah")); // 输出: Sarah
Human.greet(); // 输出: 你好！
```

注意：

1. `Human` 类继承了 `Animal` 类的静态方法 `capitalize`。
2. `Human` 也可以定义自己的静态方法，例如 `greet`。

##### 从非静态方法中调用静态方法

你可以从非静态方法中调用静态方法，但需要使用类名来调用：

```javascript
class Calculator {
    static add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        // 在非静态方法中使用静态方法
        return Calculator.add(a, 0) * b;
    }
}

const calc = new Calculator();
console.log(calc.multiply(3, 4)); // 输出: 12
console.log(Calculator.add(5, 6)); // 输出: 11
```

##### 静态方法与实例方法的区别

以下是一个对比来说明它们之间的区别：

```javascript
class MyClass {
    static staticMethod() {
        return "我是一个静态方法";
    }

    instanceMethod() {
        return "我是一个实例方法";
    }
}

console.log(MyClass.staticMethod()); // 输出: 我是一个静态方法

const obj = new MyClass();
console.log(obj.instanceMethod()); // 输出: 我是一个实例方法

// 这将抛出错误：
// console.log(MyClass.instanceMethod());

// 这也将抛出错误：
// console.log(obj.staticMethod());
```

##### 静态方法的使用场景

1. **实用工具函数**：不需要对象状态的方法。
2. **工厂方法**：用于创建具有特殊属性的实例。
3. **缓存或固定配置**：用于存储所有实例共享的数据。

工厂方法示例：

```javascript
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    static createElectricCar(make, model) {
        const car = new Car(make, model);
        car.type = 'Electric';
        return car;
    }
}

const tesla = Car.createElectricCar("Tesla", "Model S");
console.log(tesla); // 输出: Car { make: 'Tesla', model: 'Model S', type: 'Electric' }
```

##### 关键要点

1. 静态方法是在类上定义的，而不是在实例上定义的。
2. 它们通过类名调用：`ClassName.methodName()`。
3. 它们可以被子类继承。
4. 它们不能直接访问实例属性或方法。
5. 它们适用于实用工具函数、工厂方法以及管理类级别的数据。
6. 你不能在实例上调用静态方法，也不能在类上调用实例方法。

#### `Getter` 和 `Setter`

`Getter` 和 `Setter` 是允许你分别获取和设置对象值的函数。

```javascript
class human {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
    get getName() {
        return this._name;
    }
    set setName(name) {
        this._name = name;
    }
    get getAge() {
        return this._age;
    }
    set setAge(age) {
        this._age = age;
    }
}

const person = new human("", 0);
person.setName = "Raj";
person.setAge = 25;

console.log(person.getName);
console.log(person.getAge);

// 输出:
// Raj
// 25
```

#### `instanceOf` 操作符

检查一个对象是否是某个类、子类或接口的实例。

```javascript
class human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
    get getAge() {
        return this.age;
    }
    set setAge(age) {
        this.age = age;
    }
}

const person = new human("", 0);
person.setName = "Raj";
person.setAge = 25;

console.log(person.getName); // 输出: Raj
console.log(person.getAge); // 输出: 25

const person1 = "Subham"

console.log( person instanceof human) // 输出: true
console.log( person1 instanceof human) // 输出: false
```

它对于子类也会返回 `true`：

```javascript
class human {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    get getName() {
        return this.name;
    }
    set setName(name) {
        this.name = name;
    }
    get getAge() {
        return this.age;
    }
    set setAge(age) {
        this.age = age;
    }
}

class Coder extends human {
    constructor(name, age, language) {
        super(name, age);
        this.language = language;
    }
}

const person = new human("", 0);
const subham = new Coder("subham", 22, "java");
person.setName = "Raj";
person.setAge = 25;


console.log( person instanceof human) // 输出: true
console.log( subham instanceof human) // 输出: true
```

#### 封装

封装是一种限制对对象某些组件直接访问的方式。

```javascript
class BankAccount {
    #balance; // 私有字段

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

```javascript
// 封装
const user = {
    firstName: "John",
    lastName: "Doe",
    age: 25,
    getAgeYear: function() {
        return new Date().getFullYear() - this.age; // 计算出生年份
    }
}

console.log(user.getAgeYear()); // 输出：1999 (当前年份为2024)
```

#### 多态

多态意味着“多种形式”，当我们有许多通过继承相互关联的类时，就会出现多态。

```javascript
// 父类
class Animal {
  makeSound() {
    console.log("动物发出声音");
  }
}

// 子类
class Dog extends Animal {
  makeSound() {
    console.log("狗在叫");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("猫在叫");
  }
}

// 演示多态的函数
function animalSound(animal) {
  animal.makeSound();
}

// 使用示例
const animal = new Animal();
const dog = new Dog();
const cat = new Cat();

animalSound(animal); // 输出: 动物发出声音
animalSound(dog); // 输出: 狗在叫
animalSound(cat); // 输出: 猫在叫
```

#### 抽象

抽象是隐藏复杂的实现细节，只展示对象必要功能的概念。

```javascript
// 抽象类
class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }

    // 抽象方法
    start() {
        throw new Error("必须实现 'start()' 方法。");
    }

    getBrand() {
        return this.brand;
    }
}

// 具体类
class Car extends Vehicle {
    start() {
        return `${this.brand} 车正在启动...`;
    }
}

// 使用示例
const myCar = new Car("丰田");
console.log(myCar.getBrand()); // 输出: 丰田
console.log(myCar.start());    // 输出: 丰田车正在启动...
```

