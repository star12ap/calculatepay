function Calculator (people, moneyNum, eachMoney) {
    this.moneyUnit = 4; // 돈 단위 50000 10000 1000 나머지
    this.money = [50000,10000,1000,1];
    this.cutUnit = 1000; // 절삭 단위

    this.cutNumber = 0; // 절삭 개수
    this.people = people; // 사람수
    this.moneyNum = moneyNum; // 전체 돈 개수 [160,36,30,270]
    this.orgMoneyNum = this.moneyNum.map((element,idx) => {
        return element;
    }); // 전체 돈 개수 백업 [160,36,30,270]


    this.eachMoney = eachMoney; // [1920000,156120,4921950,765320]
    this.eachMoneyNum = new Array(this.people); // 각 사람별 가져야할 돈 개수

    for (let i = 0; i < this.people; i++) { // 초기화
        this.eachMoneyNum[i] = new Array(this.moneyUnit);
    }
};


Calculator.prototype.cutSmall = function() {
    let remainder = 0;
    this.eachMoney.forEach(element => {
        remainder += element % this.cutUnit;
    });

    this.cutNumber = Math.floor(remainder / this.cutUnit);
    this.moneyNum[2] -= this.cutNumber; // 천원단위 절삭 30 -> 28
    this.moneyNum[3] += this.cutNumber * this.cutUnit; // 절삭한 만큼 과에서 가져간다 270 -> 2270 
};

Calculator.prototype.divideMoneyGreedy = function() {
    let T = this;
    this.eachMoney.forEach((element,idx) => {
        for (let i = 0; i < T.money.length; i++) {
            let count = Math.floor(element / T.money[i]);
            if (i != T.money.length-1) { // 지폐 여부
                if (count <= T.moneyNum[i]) { // 지폐 수가 충분한 경우
                    T.eachMoneyNum[idx][i] = count; // 개수
                    T.moneyNum[i] -= count;
                    element = element -= count * T.money[i];

                } else { // 지폐 수가 부족한 경우
                    T.eachMoneyNum[idx][i] = T.moneyNum[i]; // 개수
                    element = element -= T.moneyNum[i] * T.money[i];
                    T.moneyNum[i] = 0;
                }
            } else {
                T.eachMoneyNum[idx][i] = element;
            }
            
        }
    });
    return this.eachMoneyNum;
};

// 만원 or 천원 대상으로 밸런싱
Calculator.prototype.balanceMoneyNumber = function(result, unit) { 
    let breakpoint = false;
    let unitCount = unit == 2 ? 10 : 5;

    while (!breakpoint && this.people > 1)
        for (let i = this.people-2; i >= 0; i--)
            if (result[i][unit] + unitCount <= result[this.people-1][unit] - unitCount) {
                result[i][unit-1] -= 1;
                result[i][unit] += unitCount;
                result[this.people-1][unit-1] += 1;
                result[this.people-1][unit] -= unitCount;
            } else {
                breakpoint = true;
                break;
            }
    return result;
};


Calculator.prototype.checkResult = function(result) {
    // 금액 확인
    for (let i = 0; i < this.people; i++) {
        let gather = 0;
        for (let j = 0; j < this.moneyUnit; j++) {
            gather += result[i][j] * this.money[j];

        }

        console.log("금액 확인 i번째 분, 원금 : " + this.eachMoney[i] + " 계산 금액 : " + gather);
        if (gather != this.eachMoney[i]) {
            return false;
        } 
    }

    // 지폐 장수 확인
    for (let i = 0; i < this.moneyUnit - 1; i++) {
        let gather = 0;
        for (let j = 0; j < this.people; j++) {
            gather += result[j][i];
        }
        
        if (i == this.moneyUnit-2) { // 천원단위이면 절삭한 부분 더해야함
            let remain = 0;
            for (let j = 0; j < this.people; j++) {
                remain += result[j][i+1];
            }
            gather += Math.floor(remain / this.cutUnit);
        }

        console.log("지폐 개수 확인 " + this.money[i] + "짜리, 원래 개수 : "+ this.orgMoneyNum[i] + " 현 개수 : " + gather);
        if (gather != this.orgMoneyNum[i]) {
            return false;
        }  
    }

    return true;
};

export { Calculator };

/*
(function() {
    let moneyNum = [160,36,30,270];
    eachMoney = [4212730,1503760 ,1917110,756670];
    var a = new Calculator(4, moneyNum,eachMoney);
    a.cutSmall();
    let res = a.divideMoneyGreedy();
    console.warn(res);
    console.warn(a.checkResult(res));
    let res2 = a.balanceMoneyNumber(res);
    console.warn(res2);
    console.warn(a.checkResult(res2));
    
})();
*/