//일반적으로 값을 할당만하면 자동으로 타입 지정됨. 구지 타입지정 안해도됨.


let Name :string = 'kim';

let Name0 :string | number = 'kim';

//타입을 변수로 선언가능
type nameType = string | number;
let Name1 :nameType = 'kim';

let Name2 :string[] = ['kim', 'park']
let Name3 : (string | number)[] = ['park' , 3];
let Age :{ age? : number } = { age : 0 }; // ?를 붙이면 이 요소가 들어올수도 있고 안들어올수도 있는걸로 판단. age가 없어도 오류를 내지 않음.

//함수도 가능
function fuc0(x :number) :number{
    return x * 2
}

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

    if(typeof x === 'number'){

        return x * 2
    }

}

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

