const hero = document.getElementById("hero");
const letter = document.getElementById("letter");
const messagePage = document.getElementById("messagePage");
const final = document.getElementById("final");

const openBtn = document.getElementById("openBtn");
const moreBtn = document.getElementById("moreBtn");
const finalBtn = document.getElementById("finalBtn");
const againBtn = document.getElementById("againBtn");

const hearts = document.getElementById("hearts");

const music = document.getElementById("loveMusic");
const musicBtn = document.getElementById("musicBtn");

let musicStarted = false;


/* =====================================================
   MEMORY EXPLOSION TIMER
===================================================== */

let memoryExplosionInterval = null;


/* =========================
   MUSIC
========================= */

function playMusic() {

  if (!music) return;

  music.volume = 0;

  const promise = music.play();

  if (promise !== undefined) {

    promise.then(() => {

      musicStarted = true;

      if (musicBtn) {
        musicBtn.classList.add("playing");
      }

      fadeMusicIn();

    }).catch(() => {

      // Browser autoplay restriction.
      // Next tap will try again.

    });
  }
}


function fadeMusicIn() {

  let volume = 0;

  const fade = setInterval(() => {

    volume += 0.025;

    if (volume >= 0.28) {

      volume = 0.28;

      clearInterval(fade);

    }

    music.volume = volume;

  }, 80);
}


function pauseMusic() {

  if (!music) return;

  music.pause();

  musicStarted = false;

  if (musicBtn) {
    musicBtn.classList.remove("playing");
  }

}


if (musicBtn) {

  musicBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    if (music.paused) {

      playMusic();

    } else {

      pauseMusic();

    }

  });

}


/* =========================
   FIRST TAP = MUSIC
========================= */

document.addEventListener(
  "click",
  () => {

    if (!musicStarted) {
      playMusic();
    }

  },
  {
    once: true
  }
);


document.addEventListener(
  "touchstart",
  () => {

    if (!musicStarted) {
      playMusic();
    }

  },
  {
    once: true,
    passive: true
  }
);


/* =========================
   PAGE TRANSITION
========================= */

function transitionTo(hide, show) {

  hide.classList.add("hidden");

  show.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================
   HEART CREATOR
========================= */

function makeHeart(burst = false) {

  const el =
    document.createElement("div");

  el.className =
    "float-heart";


  const symbols = [
    "♥",
    "♡",
    "❤",
    "💗",
    "💖"
  ];


  const colors = [
    "#ffffff",
    "#ffe0ea",
    "#ff7da4",
    "#ff477d"
  ];


  el.textContent =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];


  el.style.setProperty(
    "--x",
    Math.random() * 100 + "vw"
  );


  el.style.setProperty(
    "--s",
    14 +
    Math.random() * 22 +
    "px"
  );


  el.style.setProperty(
    "--d",
    (
      burst
        ? 3 + Math.random() * 2
        : 6 + Math.random() * 4
    ) + "s"
  );


  el.style.setProperty(
    "--drift",
    -70 +
    Math.random() * 140 +
    "px"
  );


  el.style.setProperty(
    "--c",
    colors[
      Math.floor(
        Math.random() *
        colors.length
      )
    ]
  );


  hearts.appendChild(el);


  setTimeout(() => {

    el.remove();

  }, 9000);

}


/* =========================
   HEART RAIN
========================= */

function heartRain(amount = 20) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    setTimeout(
      () => makeHeart(true),
      i * 65
    );

  }

}


/* =========================
   SPARKLES
========================= */

function sparkleBurst(amount = 22) {

  for (
    let i = 0;
    i < amount;
    i++
  ) {

    setTimeout(() => {

      const spark =
        document.createElement("div");

      spark.className =
        "spark";


      spark.style.setProperty(
        "--x",
        Math.random() * 100 + "vw"
      );


      spark.style.setProperty(
        "--y",
        15 +
        Math.random() * 70 +
        "vh"
      );


      document.body.appendChild(
        spark
      );


      setTimeout(
        () => spark.remove(),
        1000
      );

    }, i * 40);

  }

}


/* =====================================================
   PAGE 1 → PAGE 2
===================================================== */

openBtn.addEventListener(
  "click",
  () => {

    transitionTo(
      hero,
      letter
    );

    heartRain(32);

    sparkleBurst(25);

    playMusic();

  }
);


/* =====================================================
   PAGE 2 → PAGE 3
===================================================== */

moreBtn.addEventListener(
  "click",
  () => {

    transitionTo(
      letter,
      messagePage
    );

    heartRain(45);

    sparkleBurst(30);

  }
);


/* =====================================================
   PAGE 3 → FINAL PAGE
===================================================== */

finalBtn.addEventListener(
  "click",
  () => {

    transitionTo(
      messagePage,
      final
    );

    heartRain(70);

    sparkleBurst(40);

    /* START FINAL MEMORY EFFECT */

    memoryPhotoExplosion();

  }
);


/* =====================================================
   FINAL PAGE → PAGE 1
===================================================== */

againBtn.addEventListener(
  "click",
  () => {

    transitionTo(
      final,
      hero
    );

    heartRain(22);

    sparkleBurst(18);


    /* STOP FINAL EXPLOSION TIMER */

    if (memoryExplosionInterval) {

      clearInterval(
        memoryExplosionInterval
      );

      memoryExplosionInterval = null;

    }

  }
);


/* =========================
   AMBIENT HEARTS
========================= */

setInterval(() => {

  makeHeart(false);

}, 1250);


/* =========================
   TAP SPARKLE
========================= */

document.addEventListener(
  "click",
  (event) => {

    const spark =
      document.createElement("div");

    spark.className =
      "spark";


    spark.style.setProperty(
      "--x",
      event.clientX + "px"
    );


    spark.style.setProperty(
      "--y",
      event.clientY + "px"
    );


    document.body.appendChild(
      spark
    );


    setTimeout(
      () => spark.remove(),
      1000
    );

  }
);


/* =====================================================
   FLOATING MEMORY PHOTOS
   10 PHOTOS MUNA
===================================================== */

const memoryPhotos = [

  "photos/pic1.jpg",
  "photos/pic2.jpg",
  "photos/pic3.jpg",
  "photos/pic4.jpg",
  "photos/pic5.jpg",
  "photos/pic6.jpg",
  "photos/pic7.jpg",
  "photos/pic8.jpg",
  "photos/pic9.jpg",
  "photos/pic10.jpg"

];


function createMemoryPhoto() {

  const photo =
    document.createElement("div");

  photo.className =
    "floating-photo";


  /* RANDOM PHOTO */

  const img =
    document.createElement("img");


  const randomPhoto =
    memoryPhotos[
      Math.floor(
        Math.random() *
        memoryPhotos.length
      )
    ];


  img.src =
    randomPhoto;


  img.alt =
    "Our memory";


  photo.appendChild(img);


  /* RANDOM POSITION */

  photo.style.setProperty(
    "--photo-x",
    (4 + Math.random() * 88) + "vw"
  );


  /* RANDOM ROTATION */

  photo.style.setProperty(
    "--photo-rotate",
    (-12 + Math.random() * 24) + "deg"
  );


  /* RANDOM SPEED */

  const duration =
    7 + Math.random() * 4;


  photo.style.setProperty(
    "--photo-time",
    duration + "s"
  );


  /* RANDOM MOVEMENT */

  photo.style.setProperty(
    "--drift1",
    (-70 + Math.random() * 140) + "px"
  );


  photo.style.setProperty(
    "--drift2",
    (-120 + Math.random() * 240) + "px"
  );


  photo.style.setProperty(
    "--drift3",
    (-100 + Math.random() * 200) + "px"
  );


  photo.style.setProperty(
    "--drift4",
    (-160 + Math.random() * 320) + "px"
  );


  /* PUT PHOTO INSIDE HEART CONTAINER */

  if (hearts) {

    hearts.appendChild(photo);

  } else {

    document.body.appendChild(photo);

  }


  /* REMOVE AFTER ANIMATION */

  setTimeout(() => {

    photo.remove();

  }, (duration + 1) * 1000);

}


/* =====================================================
   NORMAL MEMORY PHOTOS
   MINSAN-MINSAN LANG
===================================================== */

setInterval(() => {

  if (Math.random() > 0.35) {

    createMemoryPhoto();

  }

}, 3500);


/* =====================================================
   FINAL PAGE MEMORY EXPLOSION
   EVERY 15 SECONDS
===================================================== */

function memoryPhotoExplosion() {

  /* First explosion agad pagdating sa last page */

  photoExplosion();


  /*
    Prevent multiple timers.

    Kapag paulit-ulit niyang binuksan
    ang website, hindi dadami nang dadami
    ang 15-second intervals.
  */

  if (memoryExplosionInterval) {
    return;
  }


  /*
    After 15 seconds,
    another big explosion.
  */

  memoryExplosionInterval = setInterval(() => {

    /*
      Check kung nasa last page pa.

      Kapag bumalik sa Page 1,
      hindi na siya mag-e-explode.
    */

    if (!final.classList.contains("hidden")) {

      photoExplosion();

    }

  }, 15000);

}


/* =====================================================
   ONE BIG PHOTO EXPLOSION
===================================================== */

function photoExplosion() {


  /* =========================
     MANY PHOTOS
  ========================= */

  for (let i = 0; i < 20; i++) {

    setTimeout(() => {

      createMemoryPhoto();

    }, i * 120);

  }


  /* =========================
     LOTS OF HEARTS
  ========================= */

  setTimeout(() => {

    heartRain(70);

  }, 100);


  /* =========================
     SPARKLES
  ========================= */

  setTimeout(() => {

    sparkleBurst(45);

  }, 300);


  /* =========================
     SECOND PHOTO WAVE
  ========================= */

  setTimeout(() => {

    for (let i = 0; i < 10; i++) {

      setTimeout(() => {

        createMemoryPhoto();

      }, i * 150);

    }

  }, 2500);


  /* =========================
     EXTRA HEARTS
  ========================= */

  setTimeout(() => {

    heartRain(45);

  }, 2500);

}