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


      // section2 slide
      // ================= section2 가로 스크롤 =================

// ================= section2 부드러운 가로 스크롤 =================

$(function () {

    // Swiper 설정
    var swiper = new Swiper(".tip", {

        // 카드 너비는 CSS에 지정된 503px 사용
        slidesPerView: "auto",

        // 카드 사이 간격
        spaceBetween: 20,

        // 자유로운 슬라이드 이동
        freeMode: true,

        // 직접 드래그하는 기능 비활성화
        allowTouchMove: false,

        // 스크롤바 설정
        scrollbar: {
            // HTML에 있는 스크롤바 연결
            el: "#section2 .section2_sticky > .swiper-scrollbar",

            // 스크롤바 직접 드래그 비활성화
            draggable: false,

            // 스크롤바 항상 표시
            hide: false
        }
    });


    // section2 전체 영역
    var $section = $("#section2");

    // 화면에 고정되는 영역
    var $sticky = $(".section2_sticky");

    // 카드가 이동할 수 있는 전체 거리
    var moveWidth = 0;

    // 현재 카드 이동 위치
    var currentMove = 0;

    // 목표 카드 이동 위치
    var targetMove = 0;

    // 부드러움 조절 (작을수록 느리게 이동)
    var smooth = 0.08;
    var startDelay = 250;


 // section2 높이 계산
function setSectionHeight() {

    // Swiper 크기 다시 계산
    swiper.update();

    // 카드가 마지막까지 이동할 거리
    moveWidth = Math.max(0, -swiper.maxTranslate());

    // 대기 구간 + 카드 이동 구간 + 고정 영역 높이
    $section.height($sticky.outerHeight() + startDelay + moveWidth);

    // 현재 스크롤 위치 다시 계산
    horizontalScroll();
}



   // 세로 스크롤에 따라 카드 이동 위치 계산
function horizontalScroll() {

    // 현재 페이지 스크롤 위치
    var scrollTop = $(window).scrollTop();

    // section2가 헤더 아래에 도착하는 위치
    var sectionTop = $section.offset().top - 80;

    // 처음에는 startDelay만큼 대기
    targetMove = scrollTop - sectionTop - startDelay;

    // 대기 후 첫 카드부터 마지막 카드까지 이동
    targetMove = Math.max(0, Math.min(targetMove, moveWidth));
}


    // 슬라이드를 부드럽게 이동시키는 함수
    function smoothScroll() {

        // 현재 위치가 목표 위치를 조금씩 따라감
        currentMove += (targetMove - currentMove) * smooth;

        // 거의 도착하면 정확하게 위치 맞추기
        if (Math.abs(targetMove - currentMove) < 0.1) {
            currentMove = targetMove;
        }

        // 카드 가로 이동
        swiper.setTranslate(-currentMove);

        // 슬라이드 진행 상태 업데이트
        swiper.updateProgress(-currentMove);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        // 스크롤바도 카드 이동에 맞춰 움직임
        if (swiper.scrollbar) {
            swiper.scrollbar.setTranslate();
        }

        // 부드러운 움직임을 계속 계산
        requestAnimationFrame(smoothScroll);
    }


    // 페이지가 열리면 초기 설정 실행
    setSectionHeight();
    horizontalScroll();
    smoothScroll();


    // 실제 페이지 스크롤에 따라 목표 위치 갱신
    $(window).on("scroll", horizontalScroll);


    // 브라우저 크기가 바뀌면 다시 계산
    $(window).on("resize", function () {
        setSectionHeight();
        horizontalScroll();
    });

});