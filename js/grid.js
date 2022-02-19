// 그리드 정수 입력기
class CustomEditor {
    constructor(props) {
        const el = document.createElement('input');
        const { maxLength } = props.columnInfo.editor.options;

        el.type = 'text';
        el.maxLength = maxLength;
        el.value = String(props.value);

        el.onkeyup = function() {
            this.value = this.value.replace(/[^0-9]/g,'');
            if (this.value == null || this.value == "") this.value = 0;
            if (this.value.length > 1) this.value = this.value.replace(/(^0+)/, "");
        }
        this.el = el;
    }

    getElement() {
        return this.el;
    }

    getValue() {
        return this.el.value;
    }

    mounted() {
        this.el.select();
    }
  }



// 첫 번째 그리드 생성 
const loadGrid1 = (id) => {
    let gridData = [{
        "Money50000" : 0,
        "Money10000" : 0,
        "Money1000" : 0,
        "MoneyRest" : 0,
        "Total" : 0
        // "Money50000" : 160,
        // "Money10000" : 36,
        // "Money1000" : 30,
        // "MoneyRest" : 270,
        // "Total" : 8390270
    }];

    const grid = new tui.Grid({
        el: document.getElementById(id),
        data: gridData,
        scrollX: false,
        scrollY: false,
        columns: [
          {
            header: '50000',
            name: 'Money50000',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 5
                }
            }
          },
          {
            header: '10000',
            name: 'Money10000',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 5
                }
            }
          },
          {
            header: '1000',
            name: 'Money1000',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 5
                }
            }
          },
          {
            header: '나머지',
            name: 'MoneyRest',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 3
                }
            }
          },
          {
            header: '총액',
            name: 'Total',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 20
                }
            }
          }
        ]
      });
    return grid;
}

// 두 번째 그리드 생성 
const loadGrid2 = (id) => {
    let gridData = [];
    // let gridData = [
    //     {"Money":4212730},
    //     {"Money":1503760}, 
    //     {"Money":1917110},
    //     {"Money":756670}

    // ]
    const grid = new tui.Grid({
        el: document.getElementById(id),
        data: gridData,
        scrollX: false,
        scrollY: true,
        bodyHeight:300,
        rowHeaders: ['rowNum'],
        columns: [
          {
            header: '금액',
            name: 'Money',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 20
                }
            }
          }
        ]
      });
    return grid;
}

// 세번째 그리드 생성
const loadGrid3 = (id, gridData) => {
    if (gridData == null) {
        gridData = [];
    }

    const grid = new tui.Grid({
        el: document.getElementById(id),
        data: gridData,
        scrollX: false,
        scrollY: true,
        bodyHeight:300,
        rowHeaders: ['rowNum'],
        columns: [
          {
            header: '50000',
            name: 'Money50000',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 5
                }
            }
          },
          {
            header: '10000',
            name: 'Money10000',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 5
                }
            }
          },
          {
            header: '1000',
            name: 'Money1000',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 5
                }
            }
          },
          {
            header: '나머지',
            name: 'MoneyRest',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 3
                }
            }
          },
          {
            header: '총액',
            name: 'Total',
            editor : {
                type: CustomEditor,
                options: {
                  maxLength: 20
                }
            }
          }
        ]
      });
    return grid;
}

const calcMoneyNum = (grid) => {
    let data = grid.getData()[(grid.RowAppend ? 1 : 0)];

    let colArr = ['Money50000',"Money10000","Money1000","MoneyRest"]
    let res = new Array(colArr.length);
    for (let i = 0; i < colArr.length; i++) {
      res[i] = parseInt(data[colArr[i]]);
    }   

    if (50000* res[0] + 10000 * res[1] + 1000* res[2] + res[3] != parseInt(data["Total"])) return false;
    return res;
}

const checkTotalEq = (grid, data) => {
    let total = parseInt(grid.getData()[(grid.RowAppend ? 1 : 0)]["Total"]);
    let sum = 0;
    for (let i =0 ; i < data.length; i++) {
        sum += data[i];
    }

    if (sum == total) return true;
    return false;
}



const appendTargetRow = (grid, arr) => {
    grid.appendRow({
      "Money50000":arr[0],
      "Money10000":arr[1],
      "Money1000":arr[2],
      "MoneyRest":arr[3],
      "Total":50000* arr[0] + 10000 * arr[1] + 1000* arr[2] + arr[3],
      _attributes: {
        className: {
          // Add class name on a row
          row: ['lack-white-blue']
        }
      }
    });
    grid.RowAppend = true;
}

// Grid 1
const produceMoneyArray = (grid) => {
  let data = grid.getData();
  let res = new Array();
  for (let i =0 ; i < data.length; i++) {
      res.push(parseInt(data[i]["Money"]));
  }
  return res;
}

// Grid 3
const produceDataArray = (data) => {
  let res = new Array(data.length);
  for (let i = 0; i < res.length; i++) {
      res[i] ={
          "Money50000":data[i][0],
          "Money10000":data[i][1],
          "Money1000":data[i][2],
          "MoneyRest":data[i][3],
          "Total":50000* data[i][0] + 10000 * data[i][1] + 1000* data[i][2] + data[i][3]
      };
  }
  return res;
}

export { loadGrid1, loadGrid2, loadGrid3, calcMoneyNum, produceMoneyArray, checkTotalEq, produceDataArray, appendTargetRow};

