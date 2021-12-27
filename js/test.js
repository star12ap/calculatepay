import { loadGrid1, loadGrid2, loadGrid3, calcMoneyNum , produceMoneyArray, checkTotalEq ,produceDataArray } from "./grid.js";
import { Calculator } from "./calculator.js";
  
// onload 시 그리드 및 이벤트 생성
window.onload = () => {

    (() => {
       
        var Grids = new Array();
        Grids[0] = loadGrid1('grid1');
        Grids[1] = loadGrid2('grid2');
        let info = document.getElementsByClassName("people-info");

        // 행 추가
        document.getElementById("row-add").addEventListener("click", () => {
            Grids[1].appendRow({Money:0});
        });

        // 행 제거
        document.getElementById("row-remove").addEventListener("click", () => {
            if (Grids[1].getRowCount() > 0) Grids[1].removeRow(Grids[1].getRowCount()-1);
        });

        // 계산 버튼
        document.getElementById("calculate-btn").addEventListener("click", () => {
            let moneyNum = calcMoneyNum(Grids[0]);
            
            if (!moneyNum) {
                alert("지폐 수 확인!!!!");
                return false;
            }
            else if (Grids[1].getRowCount() <= 0) {
                alert("사람 수 확인!!!!");
                return false;
            }

            let eachMoney = produceMoneyArray(Grids[1]);

            if (!checkTotalEq(Grids[0],eachMoney)) {
                alert("총액이 안 맞음");
                return false;
            }

            let calc = new Calculator(Grids[1].getRowCount(), moneyNum,eachMoney);

            calc.cutSmall();
            let res = calc.divideMoneyGreedy();
            let res2 = calc.balanceMoneyNumber(res, 2);
            let res3 = calc.balanceMoneyNumber(res2, 1);
            
            
            console.warn("2222 " + calc.checkResult(res2));
            console.warn("3333 " + calc.checkResult(res3));
            info[0].classList.add("hidden");
            info[1].classList.remove("hidden");    
            Grids[1].destroy();
            Grids.pop();
            Grids[1] = loadGrid3('grid3', produceDataArray(res3));
            
        });

        // 다시하기 버튼 클릭
        document.getElementById("calculate-again-btn").addEventListener("click", () => {
            info[1].classList.add("hidden");
            info[0].classList.remove("hidden");    
            Grids[1].destroy();
            Grids.pop();
            Grids[1] = loadGrid2('grid2');
        });

        // ? 클릭시 발생하는 이벤트 - ui 보여줌
        let help_btns = document.getElementsByClassName("help-user-btn");
        for (let i = 0; i < help_btns.length; i++) {
            help_btns[i].addEventListener("click",() => {
                document.getElementById("block-ui").classList.remove("hidden");
            });
        };
        
        // help 창에서 종료 버튼 클릭시 발생하는 이벤트 - ui 숨김
        document.getElementById("block-btn").addEventListener("click", () => {
            document.getElementById("block-ui").classList.add("hidden");
        });

        // ? 버튼 클릭시 발생하는 이벤트 - ui 내용 변경
        document.getElementsByClassName("help1")[0].addEventListener("click", () => {
            document.getElementById("help-image").setAttribute("src", "./img/grid1.PNG");
            document.getElementById("help-image-explain").innerText = "지폐 수와 총액을 기입합니다. ";
        });

        document.getElementsByClassName("help2")[0].addEventListener("click", () => {
            document.getElementById("help-image").setAttribute("src", "./img/grid2.png");
            document.getElementById("help-image-explain").innerText = "각 인원 별 수령받는 금액을 입력합니다. 버튼을 통해 인원을 추가 및 삭제 가능합니다.";
        });

        document.getElementsByClassName("help3")[0].addEventListener("click", () => {
            document.getElementById("help-image").setAttribute("src", "./img/grid3.png");
            document.getElementById("help-image-explain").innerText = "인원 별로 수령할 지폐 수가 반환됩니다. 천원 이하는 과에서 알아서 처리합니다. ";
        });
    })()
    
}

