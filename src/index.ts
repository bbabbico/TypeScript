//일반적으로 값을 할당만하면 자동으로 타입 지정됨. 구지 타입지정 안해도됨.
//tsc -w 하면 자바스크립트 파일로 컴파일됨.

let Name :string = 'kim';

let Name0 :string | number = 'kim';

//타입을 변수로 선언가능 타입은 재정의 불가. interface는 재정의 가능
type nameType = string | number;
let Name1 :nameType = 'kim';

type qqq1 = {
    readonly name : string,
}

let qq1 :qqq1 = {
    name : 'qwe'
}

qq1.name = '유라' //readonly라서 에러남 이거 안붙이면 const 여도 object 안에 요소는 바꿀수 있음.

type Square = {
    color? : string, //color 가 들어 올수도있고 아닐수도있고 undefined 랑 유니온으로 처리됨.
    width : number,
}

let sq :Square = {
    width : 100
}

// 타입끼리 확장 가능
type Name = string;
type Age = number;
type NewOne = Name | Age;

type PositionX = { x: number };
type PositionY = { y: number };
type XandY = PositionX & PositionY //합치기
let pwoe :XandY = { x : 1, y : 2 } //Type & { name : string } 이런거도 가능

//특정 글자나 숫자만 가질 수 있게 제한을 두는 타입을 literal type
let 방향: 'left' | 'right'; // 타입명이 아니고 일반 글자나 숫자로 제한하는거 가능함.
방향 = 'left';


let Name2 :string[] = ['kim', 'park']
let Name3 : (string | number)[] = ['park' , 3];
let Age :{ age? : number } = { age : 0 }; // ?를 붙이면 이 요소가 들어올수도 있고 안들어올수도 있는걸로 판단. age가 없어도 오류를 내지 않음.

//함수도 가능
function fuc0(x :number) :number{
    return x * 2
}

function fucc(a : 'hello') : 1 | 0 | -1 {
    return 1
}

var nname = {
    name : 'kim'
} as const; //이거 없으면 밑에 함수 호출문 오류남. a 에는 'kim' 만 허용인데 nname.name 이거의 반환은 문자열이기 때문, 이거 붙이면 오브젝트 nname.name 이거의 타입을 'kim' 로 바꿔줌. 그리고 오브젝트안에 속성을 모두 readonly 로 바꿔줌

function myfnc(a : 'kim') {

}
myfnc(nname.name)

//타입스크립트는 지금 변수의 타입이 확실하지 않으면 마음대로 연산할 수 없습니다.
// 항상 타입이 무엇인지 미리 체크하는 narrowing 또는 assertion 문법을 사용해야 허락해줍니다.

//에러
function fuc1(x :number | string) {
    return x * 2
}

//가능
function fuc2(x :number | string) {
    if (typeof x === 'number'){
        return x * 2
    }
}

//에러
function fuc3(x? : number) { // x라는 number 값이 들어올 수도 있고 안들어올수도 있고 아니면 unknown 으로 처리,(x : number | undefined) x가 number가 아닐수도 있으니 타입 체크해야됨. Narrowing
    let q = (x as number)*2 //assertion x로 들어온 값을 number타입으로 확정

    if(typeof x === 'number'){ //이렇게 할수도있고 A instanceof HTMLElement = A 가 HTMLElement 객체인가? 하는 방법도 있음 이거 많이씀

        return x * 2
    }
}
let 링크 = document.querySelector('#link');
if (링크 instanceof HTMLElement) {
    링크.href = 'https://kakao.com' //에러 href 는 HTMLElement 이 아니라 HTMLAnchorElement 객체임
}
// a 태그는 HTMLAnchorElement
// img 태그는 HTMLImageElement
// h4 태그는 HTMLHeadingElement



type NumOut = (x : number, y : number ) => number // 함수 파라미터/반환값을 따로 타입으로 변수 선언가능
let ABC :NumOut = function(x,y){ // 함수명:타입명
    return x + y
}

type Member1 = {
    name : string,
    age : number,
    plusOne : ( x :number ) => number, //타입 지정 가능
    changeName : () => void //
}

let 회원정보 :Member1 = {
    name : 'kim',
    age : 30,
    plusOne (x){ //오브젝트 안에도 이런 함수들 넣는거가능
        return x + 1
    },
    changeName : () => {
        console.log('안녕')
    }
}
회원정보.plusOne(1);
회원정보.changeName();

type ffc1 = (a :string) => string;
type ffc2 = (a :string) => number;

function 만들함수(a :string, func1 :ffc1, func2 :ffc2){ //함수를 파라미터로 받는거 가능
    let result = func1(a);
    let result2 = func2(result);
    console.log(result2)
}
만들함수('010-1111-2222', cutZero, removeDash)  // 함수에 함수를 파라미터로 넘기는거 가능

// array 내의 타입을 각각 지정가능
type Member = [number, boolean];
let john:Member = [100, false]


//index signature = key 가 string 인놈들은 모두 number인 값을 가져야한다.
type MyObject = {
    [key :string] : number,
}
let 철수 :MyObject = {
    age : 50,
    weight : 100,
}

let ddd :any = 1; //any 타입과 unknown 타입 은 변수안에 어떤 타입이든 다들어감. 근데 unknown 타입은 그나마 안전함. any 는 타입그냥 개무시함.
let aaa :unknown =1;

let 변수1: string = ddd;
let 변수2: string = aaa;


class Person {
    name;
    age;
    constructor ( a = 'kim' ){ //a :string 이렇게 함수 파라미터 타입지정 가능 // a='kim' 이런식으로 디폴트 값 설정 가능 constructor 는 생성자임
        this.name = a;
        this.age = 20;
    }
}

class Car {
    model :string;
    price :number;
    constructor(a :string, b :number){
        this.model = a;
        this.price = b;
    }

    tax() :number{
        return this.price * 0.1
    }
}


let car1 = new Car('소나타', 3000)
console.log(car1) //콘솔창 출력결과는 { model : '소나타', price : 3000 }
console.log(car1.tax()) //콘솔창 출력결과는 300

class Word{
    num;
    str;

    constructor(...param : (number | string)[] ){ // ...param 은 가변인수임.
        let num :number[] = [];
        let st :string[] = [];

        param.forEach((i)=>{
            if (typeof i ==='string') {
                st.push(i)
            } else {
                num.push(i)
            }
        })

        this.num = num;
        this.str = st;
    }
}


let obj = new Word('kim', 3, 5, 'park');
console.log(obj.num) //[3,5]
console.log(obj.str) //['kim', 'park']