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
$(function(){
    var swiper = new Swiper('.review_wrap', {
        autoplay:{
            delay :3000,  /* 3초마다 슬라이드 */
            disableOnInteraction: false /* 직접 넘겨도 자동 재생유지; */
        },
        loop: true, 
        speed:800
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
