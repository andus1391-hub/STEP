// top버튼 제어구문 작성
// $(function () {
    // TOP 버튼 클릭 시 맨 위로 부드럽게 이동
    // $(".topbtn").click(function () {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // });

    // 일정구간부터 버튼 나타나게하기
    // .topbtn숨김
    // $(".topbtn").hide();

    // // 스크롤하면,
    // $(window).scroll(function () {
        // 스크롤 위치가 100보다 크면 보이고, 100보다 작으면 사라진다.
        // if-else 조건문
        // if(조건) : 주어진 조건식이 true(참)일 때, if문 안의 코드를 실행한다.
        // else : 앞선 if문의 조건이 flase(거짓)일 때, else문 안의 코드를 실행한다. 
        // this : 현재 객체(여기서는 window)를 지칭함.
        // scrollTop : 현재 세로 스크롤이 얼마나 내려갔는지(픽셀 단위로 반환)
//         if ($(this).scrollTop() > 100) {
//             $(".topbtn").fadeIn()
//         } else {
//             $(".topbtn").fadeOut()
//         }
//     });
// });



// section1 아코디언
$(function () {

    // section1 카드 아코디언
    $(".section1_wrap > li").mouseenter(function () {

        // 다른 카드의 on 클래스 제거
        $(".section1_wrap > li").removeClass("on");

        // 마우스를 올린 카드에 on 클래스 추가
        $(this).addClass("on");

    });

});


// section2 카운트다운
$(function () {

    // 시작 시간: 3일 13시간 1분 0초
    var totalSeconds = (3 * 24 * 60 * 60) + (13 * 60 * 60) + 60;

    function countdown() {

        var days = Math.floor(totalSeconds / 86400);
        var hours = Math.floor((totalSeconds % 86400) / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;

        // 두 자리 숫자로 표시
        $(".days").text(String(days).padStart(2, "0"));
        $(".hours").text(String(hours).padStart(2, "0"));
        $(".minutes").text(String(minutes).padStart(2, "0"));
        $(".seconds").text(String(seconds).padStart(2, "0"));

        // 시간이 0이 되면 종료
        if (totalSeconds <= 0) {
            clearInterval(timer);
            return;
        }
        totalSeconds--;
    }
    countdown();

    // 1초마다 실행
    var timer = setInterval(countdown, 1000);
});


// section2 슬라이드
//  <!-- Initialize Swiper -->
var swiper = new Swiper('.wrap_img', {
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
        prev: {
            shadow:false,
            translate: ['0, 0, -400'],
        },
        next: {
            translate: ['-100%', 0, 0],
        },
    },
    speed: 1200,
    loop: true,
    navigation: {
        nextEl: '.book_next',
    },

});




/* ================= 종이비행기 마우스 커서 ================= */

$(function () {

    let lastX = null;
    let lastY = null;
    let angle = 0;

    // 마우스 이동
    $(document).on("mousemove", function (e) {

        const x = e.clientX;
        const y = e.clientY;

        // 링크, 버튼, 입력창에서는 종이비행기 숨기기
        if ($(e.target).closest("a, button, .topbtn, input, textarea, .input_btn, #section4 .deal").length) {
            $("#planeCursor").hide();
        } else {
            $("#planeCursor").show();
        }

        if (lastX !== null && lastY !== null) {

            const dx = x - lastX;
            const dy = y - lastY;

            // 마우스 이동 방향에 따라 회전
            if (Math.sqrt(dx * dx + dy * dy) > 2) {

                const targetAngle =
                    Math.atan2(dy, dx) * 180 / Math.PI + 45;

                let difference =
                    ((targetAngle - angle + 540) % 360) - 180;

                angle += difference * 0.32;
            }
        }

        // 마우스 위치에 종이비행기 표시
        $("#planeCursor").css({
            transform:
                `translate(${x - 15}px, ${y - 15}px) rotate(${angle}deg)`
        });

        lastX = x;
        lastY = y;

    });

    // 브라우저 밖으로 나가면 숨김
    $(document).on("mouseleave", function () {

        $("#planeCursor").hide();

        lastX = null;
        lastY = null;

    });

});

/* ================= 마우스 먼지 입자 효과 ================= */

$(function () {

    const canvas = document.getElementById("cloudCursor");
    const ctx = canvas.getContext("2d");

    // 캔버스 크기 설정
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    $(window).on("resize", resizeCanvas);

    // 먼지 입자를 저장할 배열
    let dust = [];

    // 이전 마우스 위치
    let lastX = null;
    let lastY = null;

    // 먼지 입자 생성
    function createDust(x, y) {

        for (let i = 0; i < 2; i++) {

            dust.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,

                // 입자가 흩날리는 방향
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,

                // 입자 크기
                size: Math.random() * 1.7 + 0.5,

                // 투명도
                opacity: Math.random() * 0.3 + 0.45,

                // 사라지는 속도
                fade: Math.random() * 0.012 + 0.012
            });

        }
    }

    // 마우스 이동 이벤트
    $(document).on("mousemove", function (e) {

        const x = e.clientX;
        const y = e.clientY;

        if (lastX !== null && lastY !== null) {

            const dx = x - lastX;
            const dy = y - lastY;

            const distance = Math.sqrt(dx * dx + dy * dy);

            // 마우스가 빠르게 움직여도 입자가 이어지도록 생성
            const steps = Math.min(30, Math.ceil(distance / 7));

            for (let i = 1; i <= steps; i++) {

                const ratio = i / steps;

                createDust(
                    lastX + dx * ratio,
                    lastY + dy * ratio
                );
            }

        } else {
            createDust(x, y);
        }

        lastX = x;
        lastY = y;

        // 입자가 너무 많이 쌓이지 않도록 제한
        if (dust.length > 600) {
            dust.splice(0, dust.length - 600);
        }

    });

    // 브라우저 밖으로 나가면 이전 위치 초기화
    $(document).on("mouseleave", function () {
        lastX = null;
        lastY = null;
    });

    // 먼지 입자 애니메이션
    function animateDust() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = dust.length - 1; i >= 0; i--) {

            const particle = dust[i];

            // 입자가 천천히 흩날림
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // 서서히 투명해짐
            particle.opacity -= particle.fade;

            // 사라진 입자 삭제
            if (particle.opacity <= 0) {
                dust.splice(i, 1);
                continue;
            }

            ctx.beginPath();

            // 로즈 핑크 #C78A8A
            ctx.fillStyle = `rgba(199,138,138,${particle.opacity})`;

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        requestAnimationFrame(animateDust);
    }

    // 애니메이션 실행
    animateDust();

});

