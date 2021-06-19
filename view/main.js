let money = 1000;
let select = [];
let user = [];

let bet = [];

let time = 9;

let dice = [ 'Bầu', 'Cua', 'Tôm', 'Cá', 'Nai', 'Gà' ];
let result = [];

function playGame(bet) {
    const random1 = Math.floor(Math.random() * dice.length);
    const random2 = Math.floor(Math.random() * dice.length);
    const random3 = Math.floor(Math.random() * dice.length);

    result.push(dice[random1], dice[random2], dice[random3]);
    console.log("kết quả:" + result);

    let i = 0;
    result.forEach( item => {
        if( bet[0] === item) {
            i++;
        }
    });
    console.log( "i = " + i);
    return i;
}

function updateCountdown() {
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    $('#time-countdown').text(`${seconds}`);
    time--;
}

$(document).ready(function () {
    $("#user-money").html(money);

    $('.img-select').click(function (e) { 
        $('.enter-money').fadeIn("medium");
    
        let selectValue = $(this).val();
        console.log(selectValue);
        
        bet.push(selectValue);
    
        // close 
        $('#close-enter-money').click(function (e) { 
            bet.shift();
            $('.enter-money').fadeOut("medium");
        });
    });

    //enter money
    $('#submit-money').click(function (e) { 
        
        let betsCount = parseInt($("#input-money").val());
        
        if(!betsCount) {
            alert("Không được để trống");
        } else {
            console.log(betsCount);
            $('#form-bet')[0].reset();

            $('.enter-money').fadeOut("medium");
        }
         
        bet.push(betsCount);
        money = money - betsCount;
        console.log(bet);
        $("#user-money").html(money);

        $(".chats").append(`
        <div class="my-chat"> <strong>Bạn</strong> vừa đặt cược <strong> ${bet[1]}$ </strong>  vào <strong> ${bet[0]} </strong> </div>
        `);

    });

    $('#btn-spin').click(function (e) { 
        $('.countdown').fadeIn("medium");

        let timeCountdown = setInterval(updateCountdown, 1000);

        setTimeout(function () {
            clearInterval(timeCountdown);
            $('.countdown').fadeOut("medium");
        }, 10000);

        time = 9;

        let i = playGame(bet);
        console.log("tiền cược: " + bet[1]);
        money = money + bet[1] * 2 * i;

        console.log("Số tiền:" + money);

        result = [];
        bet = [];

        $("#user-money").html(money);
    });
    
});


