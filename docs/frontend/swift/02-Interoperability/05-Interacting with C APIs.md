# 与 C 语言 API 交互

- [基本类型](#primitive_types)
- [全局常量](#global_constants)
    - [导入的常量枚举和结构体](#imported_constant_enumerations_and_structures)
- [函数](#functions)
    - [变参函数](#variadic_functions)
- [结构体](#structures)
    - [导入函数作为类型成员](#importing_functions_as_type_members)
- [枚举](#enumerations)
- [选项集](#option_sets)
- [联合体](#unions)
- [位字段](#bit_fields)
- [匿名结构体和联合体字段](#unnamed_structure_and_union_fields)
- [指针](#pointer)
	- [常量指针](#constant_pointers)
	- [可变指针](#mutable_pointers)
	- [自动释放指针](#autoreleasing_pointers)
	- [函数指针](#function_pointers)
	<!-- - [缓冲区指针](#buffer_pointers) -->
	- [空指针](#null_pointers)
	- [指针运算](#pointer_arithmetic)
- [数据类型大小计算](#data_type_size_calculation)
- [一次性初始化](#one_time_initialization)
- [预处理指令](#preprocessor_directives)
	- [简单宏](#simple_macros)
	- [复杂宏](#complex_macros)
	- [条件编译块](#conditional_compilation_blocks)

为了更好地支持与 Objective-C 语言的互用性，Swift 对一些 C 语言的类型和特性保持了兼容性，提供了一些方式来使用常见的 C 语言设计和模式。

<a name="primitive_types"></a>
## 基本类型

Swift 提供了一些与 C 语言基本数值类型（例如`char`，`int`，`float`，`double`）对应的类型。然而，这些类型和 Swift 基本数值类型（例如`Int`）之间不能进行隐式转换。因此，只应在必要时才使用这些类型，尽可能地使用`Int`这种原生 Swift 类型。

| C 类型 | Swift 类型 |
| ------ | ------ |
| bool | CBool |
| char, signed char | CChar |
| unsigned char | CUnsignedChar |
| short | CShort |
| unsigned short | CUnsignedShort |
| int | CInt |
| unsigned int | CUnsignedInt |
| long | CLong |
| unsigned long | CUnsignedLong |
| long long | CLongLong |
| unsigned long long | CUnsignedLongLong |
| wchar_t | CWideChar |
| char16_t | CChar16 |
| char32_t | CChar32 |
| float | CFloat |
| double | CDouble |

<a name="global_constants"></a>
## 全局常量

C 和 Objective-C 的源文件中定义的全局常量会自动被 Swift 编译器导入为 Swift 全局常量。

<a name="imported_constant_enumerations_and_structures"></a>
### 导入的常量枚举和结构体

在 Objective-C，常量通常用来为属性或者方法参数提供一系列合适的值。你可以用 `NS_TYPED_ENUM` 或 `NS_TYPED_EXTENSIBLE_ENUM` 宏标注 Objective-C `typedef` 声明，这样 Swift 就会将该类型导入为枚举或结构体，而该类型的各种常量会变成相应的类型成员。使用 `NS_TYPED_ENUM` 宏标注一套不会再扩充新值的常量声明。使用 `NS_TYPED_EXTENSIBLE_ENUM` 宏标注一套可以通过 Swift 扩展来扩充新值的常量声明。

表示一组固定值的常量声明在标注 `NS_TYPED_ENUM` 宏之后会以结构体形式导入到 Swift。例如，请考虑如下整形常量类型 `TrafficLightColor` 的 Objective-C 声明：

```objective-c
typedef long TrafficLightColor NS_TYPED_ENUM;

TrafficLightColor const TrafficLightColorRed;
TrafficLightColor const TrafficLightColorYellow;
TrafficLightColor const TrafficLightColorGreen;
```

Swift 会以如下形式导入它们：

```swift
struct TrafficLightColor: RawRepresentable, Equatable, Hashable {
    typealias RawValue = Int

    init(rawValue: RawValue)
    var rawValue: RawValue { get }

    static var red: TrafficLightColor { get }
    static var yellow: TrafficLightColor { get }
    static var green: TrafficLightColor { get }
}
```

表示一套可扩充新值的常量的声明在标注 `NS_TYPED_EXTENSIBLE_ENUM` 宏之后也会作为结构体导入到 Swift。例如，考虑以下 Objective-C 声明，它们表示交通信号灯的颜色组合：

```objective-c
typedef TrafficLightColor TrafficLightCombo [3] NS_TYPED_EXTENSIBLE_ENUM;

TrafficLightCombo const TrafficLightComboJustRed;
TrafficLightCombo const TrafficLightComboJustYellow;
TrafficLightCombo const TrafficLightComboJustGreen;

TrafficLightCombo const TrafficLightComboRedYellow;
```

Swift 会以如下形式导入它们：

```swift
struct TrafficLightCombo: RawRepresentable, Equatable, Hashable {
    typealias RawValue = (TrafficLightColor, TrafficLightColor, TrafficLightColor)

    init(_ rawValue: RawValue)
    init(rawValue: RawValue)
    var rawValue: RawValue { get }

    static var justRed: TrafficLightCombo { get }
    static var justYellow: TrafficLightCombo { get }
    static var justGreen: TrafficLightCombo { get }
    static var redYellow: TrafficLightCombo { get }
}
```

可以看到，使用可扩充形式的常量声明在导入后会额外获得一个构造器，这使得调用者可以在扩充新值时省略参数标签。

标注 `NS_TYPED_EXTENSIBLE_ENUM` 宏的常量声明可在 Swift 代码中进行扩充以添加新值：

```swift
extension TrafficLightCombo {
    static var all: TrafficLightCombo {
        return TrafficLightCombo((.red, .yellow, .green))
    }
}
```

> 注意  
> 你可能会遇到使用 `NS_STRING_ENUM` 和 `NS_EXTENSIBLE_STRING_ENUM` 旧版宏的 Objective-C 代码，这些宏用于组织字符串常量。组织任意类型的相关常量（包括字符串常量）时，请使用 `NS_TYPED_ENUM` 和 `NS_TYPED_EXTENSIBLE_ENUM`。

<a name="functions"></a>
## 函数

Swift 将 C 头文件中的所有函数声明导入为 Swift 全局函数。例如，思考如下 Objective-C 函数声明：

```objective-c
int product(int multiplier, int multiplicand);
int quotient(int dividend, int devisor, int *remainder);

struct Point2D createPoint2D(float x, float y);
float distance(struct Point2D from, struct Point2D to);
```

Swift 会以如下形式导入它们：

```swift
func product(_ multiplier: Int32, _ multiplicand: Int32) -> Int32
func quotient(_ dividend: Int32, _ devisor: Int32, _ remainder: UnsafeMutablePointer<Int32>) -> Int32

func createPoint2D(_ x: Float, _ y: Float) -> Point2D
func distance(_ from: Point2D, _ to: Point2D) -> Float
```

<a name="variadic_functions"></a>
### 变参函数

在 Swift，可以调用 C 中的可变参数函数，例如`vasprintf`函数，调用这种函数需使用 `getVaList(_:)` 或 `withVaList(_:_:)` 函数。`getVaList(_:)`函数接受一个`CVarArgType`类型的数组，返回一个`CVaListPointer`类型的值。`withVaList(_:_:)`函数则会在闭包体中通过闭包参数来提供该值，而不是直接返回它。最终，`CVaListPointer`类型的值会传递给接受可变参数的 C 函数的`va_list`参数。

例如，如下示例代码演示了如何在 Swift 中调用`vasprintf`函数：

```swift
func swiftprintf(format: String, arguments: CVarArg...) -> String? {
    return withVaList(arguments) { va_list in
        var buffer: UnsafeMutablePointer<Int8>? = nil
        return format.withCString { CString in
            guard vasprintf(&buffer, CString, va_list) != 0 else {
                return nil
            }

            return String(validatingUTF8: buffer!)
        }
    }
}
print(swiftprintf(format: "√2 ≅ %g", arguments: sqrt(2.0))!)
// 打印 "√2 ≅ 1.41421"
```

> 注意  
> 可选指针不能传递给`withVaList(_:invoke:)`函数。相反，使用`Int.init(bitPattern:)`构造器将可选指针转化为`Int`值，在所有支持的平台上，`Int`类型的 C 可变函数调用约定和指针类型一样。

<a name="structures"></a>
## 结构体

Swift 将 C 头文件中的所有结构体声明导入为 Swift 结构体。导入后的结构体会用存储属性表示结构体中的字段，并且有一个参数对应各个存储属性的构造器。如果所有被导入的结构体成员都有默认值，Swift 还会提供一个无参数的默认构造器。例如，思考如下 C 结构体声明：

```objective-c
struct Color {
    float r, g, b;
};
typedef struct Color Color;
```

相对应的 Swift 结构体如下所示：

```swift
public struct Color {
    var r: Float
    var g: Float
    var b: Float

    init()
    init(r: Float, g: Float, b: Float)
}
```

<a name="importing_functions_as_type_members"></a>
### 导入函数作为类型成员

C API，例如 Core Foundation 框架，通常会提供一些函数用于创建、访问、修改结构体。你可以在自己的代码中使用`CF_SWIFT_NAME`宏来让 Swift 将这些 C 函数导入为相应结构体的成员函数。例如，对于如下 C 函数声明：

```objective-c
Color ColorCreateWithCMYK(float c, float m, float y, float k) CF_SWIFT_NAME(Color.init(c:m:y:k:));

float ColorGetHue(Color color) CF_SWIFT_NAME(getter:Color.hue(self:));
void ColorSetHue(Color color, float hue) CF_SWIFT_NAME(setter:Color.hue(self:newValue:));

Color ColorDarkenColor(Color color, float amount) CF_SWIFT_NAME(Color.darken(self:amount:));

extern const Color ColorBondiBlue CF_SWIFT_NAME(Color.bondiBlue);

Color ColorGetCalibrationColor(void) CF_SWIFT_NAME(getter:Color.calibration());
Color ColorSetCalibrationColor(Color color) CF_SWIFT_NAME(setter:Color.calibration(newValue:));
```

Swift 会将其导入为结构体的成员函数：

```swift
extension Color {
    init(c: Float, m: Float, y: Float, k: Float)

    var hue: Float { get set }

    func darken(amount: Float) -> Color

    static var bondiBlue: Color

    static var calibration: Color
}
```

传入`CF_SWIFT_NAME`宏的参数使用和`#selector`表达式相同的语法。实例方法对应的`CF_SWIFT_NAME`宏中的参数`self`引用着方法的调用者。

> 注意  
> 你无法使用`CF_SWIFT_NAME`宏改变方法的参数顺序或参数数量，要实现该需求，只能提供一个新的 Swift 函数，并在函数实现中调用相关函数。

<a name="enumerations"></a>
## 枚举

Swift 会将用`NS_ENUM`宏标注的 C 语言枚举导入为原始值类型为`Int`的 Swift 枚举。无论是系统框架还是自己代码中的枚举，导入到 Swift 后，它们的前缀名均会被移除。

例如，一个 Objective-C 枚举的声明如下：

```objective-c
typedef NS_ENUM(NSInteger, UITableViewCellStyle) {
	UITableViewCellStyleDefault,
    UITableViewCellStyleValue1,
    UITableViewCellStyleValue2,
    UITableViewCellStyleSubtitle
};
```

在 Swift，它被导入为如下形式：

```swift
enum UITableViewCellStyle: Int {
    case `default`
    case value1
    case value2
    case subtitle
}
```

需要使用一个枚举值时，使用以点（`.`）开头的枚举变量名：

```swift
let cellStyle: UITableViewCellStyle = .default
```

> 注意  
> 对于导入到 Swift 的 C 枚举，使用原始值进行初始化时，即使原始值不匹配任何枚举值，初始化也不会失败。这是为了兼容 C 枚举的特性，即枚举可以存储任何值，包括一些只在内部使用而没有在头文件中暴露出来的值。

Swift 会将未使用`NS_ENUM`或`NS_OPTIONS`宏标注的 C 语言枚举导入为结构体。每个枚举成员会被导入为属性类型是该结构体类型的全局只读计算型属性，而不是作为结构体本身的属性。

例如，下面是个未使用`NS_ENUM`宏声明的 C 语言枚举：

```objective-c
typedef enum {
    MessageDispositionUnread = 0,
    MessageDispositionRead = 1,
    MessageDispositionDeleted = -1,
} MessageDisposition;
```

在 Swift，它被导入为如下形式：

```swift
struct MessageDisposition: RawRepresentable, Equatable {}

var MessageDispositionUnread: MessageDisposition { get }
var MessageDispositionRead: MessageDisposition { get }
var MessageDispositionDeleted: MessageDisposition { get }
```

被导入到 Swift 的 C 语言枚举会自动遵守`Equatable`协议。

<a name="option_sets"></a>
## 选项集

Swfit 会将使用`NS_OPTIONS`宏标注的 C 语言枚举导入为 Swfit 选项集。选项集会像枚举一样把前缀移除，只剩下选项值名称。

例如，一个 Objective-C 选项集的声明如下：

```objective-c
typedef NS_OPTIONS(NSUInteger, UIViewAutoresizing) {
    UIViewAutoresizingNone                 = 0,
    UIViewAutoresizingFlexibleLeftMargin   = 1 << 0,
    UIViewAutoresizingFlexibleWidth        = 1 << 1,
    UIViewAutoresizingFlexibleRightMargin  = 1 << 2,
    UIViewAutoresizingFlexibleTopMargin    = 1 << 3,
    UIViewAutoresizingFlexibleHeight       = 1 << 4,
    UIViewAutoresizingFlexibleBottomMargin = 1 << 5
};
```

在 Swift，它被导入为如下形式：

```swift
public struct UIViewAutoresizing : OptionSet {
    public init(rawValue: UInt)

    public static var flexibleLeftMargin: UIViewAutoresizing { get }
    public static var flexibleWidth: UIViewAutoresizing { get }
    public static var flexibleRightMargin: UIViewAutoresizing { get }
    public static var flexibleTopMargin: UIViewAutoresizing { get }
    public static var flexibleHeight: UIViewAutoresizing { get }
    public static var flexibleBottomMargin: UIViewAutoresizing { get }
}
```

在 Objective-C，一个选项集是一些整数值的位掩码。可以使用按位或操作符（`|`）组合选项值，使用按位与操作符（`&`）检查选项值。可以使用常量值或者表达式创建一个选项集。一个空的选项集使用常数`0`表示。

在 Swift，选项集用一个遵守`OptionSet`协议的结构体表示，每个选项值都是结构体的一个静态变量。可以使用一个数组字面量创建一个选项集，访问选项值像枚举一样也用点（`.`）开头。创建空选项集时，可以使用一个空数组字面量，也可以调用默认构造器。

> 注意  
> 在导入标注`NS_OPTIONS`宏的 C 枚举时，Swift 会忽略值为`0`的枚举成员，因为 Swift 会使用空选项集表示这种选项。

选项集类似于 Swift 的集合类型`Set`，可以用`insert(_:)`或者`formUnion(_:)`方法添加选项值，用`remove(_:)`或者`subtract(_:)`方法移除选项值，用`contains(_:)`方法检查选项值。

```swift
let options: Data.Base64EncodingOptions = [
    .lineLength64Characters,
    .endLineWithLineFeed
]
let string = data.base64EncodedString(options: options)
```

<a name="unions"></a>
## 联合体

Swift 将 C 联合体导入为 Swift 结构体。尽管 Swift 不支持联合体，但 C 联合体导入为 Swift 结构体后仍将保持类似 C 联合体的行为。例如，思考如下名为`SchroedingersCat`的 C 联合体，它拥有`isAlive`和`isDead`两个字段：

```swift
union SchroedingersCat {
    bool isAlive;
    bool isDead;
};

它被导入到 Swift 后如下所示：

struct SchroedingersCat {
    var isAlive: Bool { get set }
    var isDead: Bool { get set }

    init(isAlive: Bool)
    init(isDead: Bool)

    init()
}
```

由于 C 联合体所有字段共享同一块内存，因此联合体作为结构体导入到 Swift 后，所有计算属性也会共享同一块内存。这将导致修改任意计算属性的值都会改变其他计算属性的值。

在上述例子中，修改结构体`SchroedingersCat`的计算属性`isAlive`的值也会改变计算属性`isDead`的值：

```swift
var mittens = SchroedingersCat(isAlive: false)

print(mittens.isAlive, mittens.isDead)
// 打印 "false false"

mittens.isAlive = true
print(mittens.isDead)
// 打印 "true"
```

<a name="bit_fields"></a>
## 位字段

Swift 会将结构体中的位字段导入为结构体的计算型属性，例如 Foundation 中的`NSDecimal`类型。使用位字段相对应的计算属性时，Swift 会处理好这些值和其兼容的 Swift 类型之间的转换工作。

<a name="unnamed_structure_and_union_fields"></a>
## 匿名结构体和联合体字段

C `struct`和`union`类型既可以定义匿名字段，也可以定义具有匿名类型的字段。匿名字段由内部所嵌套的拥有命名字段的`struct`或`union`类型构成。

例如，在如下这个 C 结构体`Cake`中，`layers`和`height`两个字段嵌套在匿名`union`类型中，`toppings`字段则是一个匿名`struct`类型：

```objective-c
struct Cake {
    union {
        int layers;
        double height;
    };

    struct {
        bool icing;
        bool sprinkles;
    } toppings;
};
```

导入到 Swift 后，可以像如下这样创建和使用它：

```swift
var simpleCake = Cake()
simpleCake.layers = 5
print(simpleCake.toppings.icing)
```

`Cake`结构体被导入后会拥有一个逐一成员构造器，可以通过该构造器将结构体的字段初始化为自定义的值，就像下面这样：

```swift
let cake = Cake(
    .init(layers: 2),
    toppings: .init(icing: true, sprinkles: false)
)

print("The cake has \(cake.layers) layers.")
// 打印 "The cake has 2 layers."
print("Does it have sprinkles?", cake.toppings.sprinkles ? "Yes." : "No.")
// 打印 "Does it have sprinkles? No."
```

因为`Cake`结构体第一个字段是匿名的，因此构造器的第一个参数没有标签。由于`Cake`结构体的字段是匿名类型，因此使用`.init`构造器，这将借助类型推断来为结构体的每个匿名字段设置初始值。

<a name="pointer"></a>
## 指针

Swift 尽可能地避免直接使用指针。不过，Swift 也提供了多种指针类型以供直接操作内存。如下表格使用`Type`作为类型名称的占位符来表示相应的映射语法。

对于返回类型，变量和参数，遵循如下映射：

| C 语法 | Swift 语法 |
| ------ | ------ |
| const Type * | UnsafePointer\<Type\> |
| Type * | UnsafeMutablePointer\<Type\> |

对于类类型，遵循如下映射：

| C 语法 | Swift 语法 |
| ------ | ------ |
| Type * const * | UnsafePointer\<Type\> |
| Type * __strong * | UnsafeMutablePointer\<Type\> |
| Type ** | AutoreleasingUnsafeMutablePointer\<Type\> |

对于指向原始内存的无类型指针，遵循如下映射：

| C 语法 | Swift 语法 |
| ------ | ------ |
| const void * | UnsafeRawPointer |
| void * | UnsafeMutableRawPointer |

<!-- Swift 还提供了用于操作缓冲区的指针类型，如[缓冲区指针](buffer_pointers)所述。 -->

如果指针的类型在 Swift 中无法表示，例如某个不完备的结构体类型，Swift 会将之导入为`OpaquePointer`。

<a name="constant_pointers"></a>
### 常量指针

如果函数接受`UnsafePointer<Type>`参数，那么该函数参数可以是下列任意一种类型：

* `UnsafePointer<Type>`，`UnsafeMutablePointer<Type>`，`AutoreleasingUnsafeMutablePointer<Type>`类型的值，后两种类型会转换成`UnsafePointer<Type>`。
* 一个`String`类型的值，如果`Type`是`Int8`或者`UInt8`。`String`类型的值会被自动转换为 UTF8 形式到一个缓冲区内，该缓冲区的指针会被传递给函数。
* 一个左操作数为`Type`类型的`inout`表达式，左操作数的内存地址作为函数参数传入。
* 一个`[Type]`类型的值，将作为该数组的起始指针传递给函数。

传递给函数的指针仅保证在函数调用期间内有效，不要试图保留指针并在函数返回之后继续使用。

如果定义了一个类似下面这样的函数：

```swift
func takesAPointer(_ p: UnsafePointer<Float>) {
    // ...
}
```

那么可以通过以下任意一种方式来调用该函数：

```swift
var x: Float = 0.0
takesAPointer(&x)
takesAPointer([1.0, 2.0, 3.0])
```

如果函数接受`UnsafeRawPointer`参数，那么该函数参数可以是任意类型的`UnsafePointer<Type>`。

如果定义了一个类似下面这样的函数：

```swift
func takesAVoidPointer(_ p: UnsafeRawPointer?)  {
    // ...
}
```

那么可以通过以下任意一种方式来调用该函数：

```swift
var x: Float = 0.0, y: Int = 0
takesAVoidPointer(&x)
takesAVoidPointer(&y)
takesAVoidPointer([1.0, 2.0, 3.0] as [Float])
let intArray = [1, 2, 3]
takesAVoidPointer(intArray)
```

<a name="mutable_pointers"></a>
### 可变指针

如果函数接受`UnsafeMutablePointer<Type>`参数，那么该函数参数可以是下列任意一种类型：

* 一个`UnsafeMutablePointer<Type>`类型的值。
* 一个左操作数为`Type`类型的`inout`表达式，左操作数的内存地址作为函数参数传入。
* 一个`inout [Type]`类型的值，将作为该数组的起始指针传入，其生命周期会延续到本次调用结束。

如果定义了一个类似下面这样的函数：

```swift
func takesAMutablePointer(_ p: UnsafeMutablePointer<Float>) {
    // ...
}
```

那么可以通过以下任意一种方式来调用该函数：

```swift
var x: Float = 0.0
var a: [Float] = [1.0, 2.0, 3.0]
takesAMutablePointer(&x)
takesAMutablePointer(&a)
```

如果函数接受`UnsafeMutableRawPointer`参数，那么该函数参数可以是任意类型的`UnsafeMutablePointer<Type>`。

如果定义了一个类似下面这样的函数：

```swift
func takesAMutableVoidPointer(_ p: UnsafeMutableRawPointer?)  {
    // ...
}
```

那么可以通过以下任意一种方式来调用该函数：

```swift
var x: Float = 0.0, y: Int = 0
var a: [Float] = [1.0, 2.0, 3.0], b: [Int] = [1, 2, 3]
takesAMutableVoidPointer(&x)
takesAMutableVoidPointer(&y)
takesAMutableVoidPointer(&a)
takesAMutableVoidPointer(&b)
```

<a name="autoreleasing_pointers"></a>
### 自动释放指针

如果函数接受`AutoreleasingUnsafeMutablePointer<Type>`参数，那么该函数参数可以是下列任意一种类型：

* 一个`AutoreleasingUnsafeMutablePointer<Type>`类型的值。
* 一个`inout`表达式，其操作数首先被拷贝到一个无主临时缓冲区，缓冲区的地址会作为函数参数传入。函数调用结束时，读取并保留缓冲区中的值，然后重新赋值给操作数。

注意，上述列表中没有包含数组。

如果定义了一个类似下面这样的函数：

```swift
func takesAnAutoreleasingPointer(_ p: AutoreleasingUnsafeMutablePointer<NSDate?>) {
    // ...
}
```

那么可以通过以下方式来调用该函数：

```swift
var x: NSDate? = nil
takesAnAutoreleasingPointer(&x)
```

指针指向的类型不会被桥接。例如，`NSString **`转换到 Swift 后，会是`AutoreleasingUnsafeMutablePointer<NSString?>`，而不是`AutoreleasingUnsafeMutablePointer<String?>`。

<a name="function_pointers"></a>
### 函数指针

Swift 将 C 函数指针导入为沿用其调用约定的闭包，使用`@convention(c)`特性来表示。例如，一个类型为`int (*)(void)`的 C 函数指针，会以`@convention(c) () -> Int32`的形式导入到 Swift。

调用一个以函数指针为参数的函数时，可以传递一个顶级的 Swift 函数作为其参数，也可以传递闭包字面量，或者`nil`。也可以传递一个泛型类型的闭包属性或者泛型方法，只要闭包的参数列表或闭包体内没有引用泛型类型的参数。例如，Core Foundation 的`CFArrayCreateMutable(_:_:_:)`函数接受一个`CFArrayCallBacks`结构体作为参数，这个`CFArrayCallBacks`结构体使用一些函数指针进行初始化：

```swift
func customCopyDescription(_ p: UnsafeRawPointer?) -> Unmanaged<CFString>? {
    // 返回一个 Unmanaged<CFString>? 值
}

var callbacks = CFArrayCallBacks(
    version: 0,
    retain: nil,
    release: nil,
    copyDescription: customCopyDescription,
    equal: { (p1, p2) -> DarwinBoolean in
        // 返回布尔值
    }
)

var mutableArray = CFArrayCreateMutable(nil, 0, &callbacks)
```

上面的例子中，结构体`CFArrayCallBacks`的构造器使用`nil`作为参数`retain`和`release`的值，使用函数`customCopyDescription`作为参数`copyDescription`的值，最后使用一个闭包字面量作为参数`equal`的值。

> 注意  
> 只有使用 C 函数指针调用约定的 Swift 函数才可以作为函数指针参数。如同 C 函数指针，使用`@convention(c)`特性的 Swift 函数同样不具有捕获周围作用域上下文的能力。

更多信息请参阅 [*The Swift Programming Language 中文版*](http://wiki.jikexueyuan.com/project/swift/) 的[类型特性](http://wiki.jikexueyuan.com/project/swift/chapter3/06_Attributes.html#type_attributes)小节。 



