async function rewriteDate(data) {
    let date = data.slice(1, -1);
    let splitDate = date.split(`, `);
    let monthDay = splitDate[0].split(` `);
    let mes = monthDay[0];
        function monthSwitch(mes){ 
            switch (mes){
                case 'Dec' : return "12" 
                case 'Nov' : return "11"
                case 'Oct' : return "10"
                case 'Sep' : return "09"
                case 'Aug' : return "08"
                case 'Jul' : return "07"
                case 'Jun' : return "06"
                case 'May' : return "05"
                case 'Apr' : return "04"
                case 'Mar' : return "03"
                case 'Feb' : return "02" 
                case 'Jan' : return "01" 
                default: return mes
            }
        };
    let dia = monthDay[1];
        function daySwitch(dia){
          switch (dia){
            case '1' : return '01'
            case '2' : return '02'
            case '3' : return '03'
            case '4' : return '04'
            case '5' : return '05'
            case '6' : return '06'
            case '7' : return '07'
            case '8' : return '08'
            case '9' : return '09'
            default : return dia
          }
        }
    let ano = splitDate[1];

   return monthSwitch(mes)+daySwitch(dia)+ano      
  };

export default rewriteDate;
