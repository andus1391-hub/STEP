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

    // 스크롤하면,
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





// section1 확대 → 가로 이동 → section2 확대
$(function () {

    var $horizontal = $(".horizontal_scroll");
    var $track = $(".horizontal_track");

    var $photo1 = $("#section1 .pic");
    var $photo2 = $("#section2 .pic");

    if (!$horizontal.length) return;

    var current = 0;
    var target = 0;

    // 사진 시작 크기
    var startScale = 0.36;

    // 부드러운 움직임
    var smooth = 0.075;

    // 가로 이동 거리
    var moveWidth = 1920;

    // 애니메이션 구간
    var firstZoomEnd = 0.30;
    
    var horizontalEnd = 0.65;


    // 스크롤 위치 계산
    function updateScroll() {

        var scrollTop = $(window).scrollTop();
        var sectionTop = $horizontal.offset().top;

        var scrollRange =
            $horizontal.outerHeight() - $(window).height();

        target = (scrollTop - sectionTop) / scrollRange;

        target = Math.max(0, Math.min(1, target));
    }


    // 애니메이션
    function animate() {

        current += (target - current) * smooth;

        if (Math.abs(target - current) < 0.0001) {
            current = target;
        }




        // 1. section1 왼쪽 사진 확대
        var zoom1Progress = Math.min(
            1,
            current / firstZoomEnd
        );

        var scale1 =
            startScale + (1 - startScale) * zoom1Progress;

        $photo1.css({
            transform: "scale(" + scale1 + ")",
            transformOrigin: "top left"
        });


        // 2. section2로 가로 이동
        var horizontalProgress =
            (current - firstZoomEnd) /
            (horizontalEnd - firstZoomEnd);

        horizontalProgress = Math.max(
            0,
            Math.min(1, horizontalProgress)
        );

        var moveX = moveWidth * horizontalProgress;

       $track.css({
    transform: "translate3d(-" + moveX + "px, 0, 0)"
});



        // 3. section2 오른쪽 사진 확대
        var zoom2Progress =
            (current - horizontalEnd) /
           0.25;


        zoom2Progress = Math.max(
            0,
            Math.min(1, zoom2Progress)
        );

        var scale2 =
            startScale + (1 - startScale) * zoom2Progress;

        $photo2.css({
            transform: "scale(" + scale2 + ")",
            transformOrigin: "top right"
        });


        requestAnimationFrame(animate);
    }


    $(window).on("scroll", updateScroll);
    $(window).on("resize", updateScroll);

    updateScroll();
    animate();

});


// section4 video 글자 나타나게 하기
$(function () {

    var $section = $("#section4");
    var $wrap = $("#section4 .section4_wrap");
    var $texts = $("#section4 .slogan_box p");
    var $image = $("#section4 .slogan_img");

    function section4Scroll() {

        var scrollTop = $(window).scrollTop();
        var sectionTop = $section.offset().top;

        // 스크롤 가능한 거리
        var scrollRange = $section.outerHeight() - $wrap.outerHeight();

        // 스크롤 진행률 계산
        var progress = (scrollTop - sectionTop) / scrollRange;

        progress = Math.max(0, Math.min(1, progress));

        // 현재 표시할 문장
        var index = Math.min(3, Math.floor(progress * 4));

        // 문장 순서대로 표시
        $texts.removeClass("on");
        $texts.eq(index).addClass("on");

        // 두 번째 문장부터 이미지 전환
        if (index >= 1) {
            $image.addClass("on");
        } else {
            $image.removeClass("on");
        }

    }

    // 마우스 휠로 페이지를 스크롤할 때 실행
    $(window).on("scroll resize", section4Scroll);

    // 페이지 로딩 시 첫 번째 문장 표시
    section4Scroll();

});

// 마지막 문장 글자 분리
var $lastText = $("#section4 .slogan_box p:last-child");

var text = $lastText.text();

$lastText.empty();

$.each(text.split(""), function (i, letter) {

    var move = (Math.random() - 0.5) * 200;

    $("<span>")
        .text(letter === " " ? "\u00A0" : letter)
        .css("--move", move + "px")
        .appendTo($lastText);

});