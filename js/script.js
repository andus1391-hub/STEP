// top버튼 제어구문 작성
$(function () {
    // TOP 버튼 클릭 시 맨 위로 부드럽게 이동
    $(".topbtn").click(function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 일정구간부터 버튼 나타나게하기
    // .topbtn숨김
    $(".topbtn").hide();

    // 스크롤하면,
    $(window).scroll(function () {
        // 스크롤 위치가 100보다 크면 보이고, 100보다 작으면 사라진다.
        // if-else 조건문
        // if(조건) : 주어진 조건식이 true(참)일 때, if문 안의 코드를 실행한다.
        // else : 앞선 if문의 조건이 flase(거짓)일 때, else문 안의 코드를 실행한다. 
        // this : 현재 객체(여기서는 window)를 지칭함.
        // scrollTop : 현재 세로 스크롤이 얼마나 내려갔는지(픽셀 단위로 반환)
        if ($(this).scrollTop() > 100) {
            $(".topbtn").fadeIn()
        } else {
            $(".topbtn").fadeOut()
        }
    });
});

// <!-- Initialize Swiper -->
// section1 slide 
// $(function () {
//     var swiper = new Swiper(".section1", {
//         slidesPerView: "auto",
//         spaceBetween: 32,
//         centeredSlides: false,
//         loop: true,
//         autoplay: {
//             delay: 0,
//             disableOnInteraction: false,
//         },
//         speed: 5000,
//     });
// });


// section1 카드 슬라이드 마우스 올리면 멈추고 내리면 다시 움직임


$(function () {

    var swiper = new Swiper(".section1", {
        slidesPerView: "auto",
        spaceBetween: 32,
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        speed: 5000
    });

    var normalSpeed = 5000;

    // 마우스를 올리면 현재 위치에서 즉시 멈춤
    $(".section1").mouseenter(function () {

        var position = swiper.getTranslate();

        swiper.autoplay.stop();
        swiper.setTransition(0);
        swiper.setTranslate(position);

    });

    // 마우스를 떼면 원래 속도로 다시 이동
    $(".section1").mouseleave(function () {

        var position = swiper.getTranslate();

        // 다음 슬라이드까지 남은 거리
        var nextIndex = swiper.activeIndex + 1;

        if (nextIndex >= swiper.slides.length) {
            nextIndex = 0;
        }

        var targetPosition = -(swiper.slidesGrid[nextIndex] || 0);
        var distance = Math.abs(targetPosition - position);

        // 남은 거리에 비례해 이동 시간 계산
        var slideDistance = 450 + 32;
        var remainingSpeed = normalSpeed * (distance / slideDistance);

        swiper.wrapperEl.style.transitionTimingFunction = "linear";

        swiper.slideTo(nextIndex, remainingSpeed);

        swiper.autoplay.start();

    });

});



// section5 slide
$(function () {
    var swiper = new Swiper('.review_wrap', {
        autoplay: {
            delay: 3000,  /* 3초마다 슬라이드 */
            disableOnInteraction: false /* 직접 넘겨도 자동 재생유지; */
        },
        loop: true,
        speed: 800
    });
});











// section2 탭 동작
$(function () {

    // .board li a 클릭했을 때, 실행하는 함수
    $(".board li a").click(function () {

        // .board li a(this) 중에 사용자가 클릭한 .board li a의
        // 부모(.board li = parent)에 'on'이라는 클래스를 추가하고,
        // 부모(.board li)의 형제 요소들(=siblings)은 'on'클래스를 지운다.

        $(this).parent().addClass("on").siblings().removeClass("on");

    });

});

// section2 탭 클릭시 안올라가게
$(".board li a").click(function () {
    return false;
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
        if ($(e.target).closest("a, button, .topbtn, input, textarea, .input_btn").length) {
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

