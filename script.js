let users = [
  {
    profilePic: "",
    displayPic: "./assets/image1.jpg",
    pendingMessage: 8,
    location: "USA, California",
    name: "Victoria",
    age: 20,
    interests: [
      {
        icon: `<i class="text-sm ri-music-2-fill"></i>`,
        interest: "music",
      },
      {
        icon: `<i class="ri-quill-pen-fill"></i>`,
        interest: "painting",
      },
    ],
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio suscipit velit voluptatum id? Modi, esse?",
    isFriend: null,
  },
  {
    profilePic: "",
    displayPic: "./assets/image2.jpg",
    pendingMessage: 4,
    location: "India, Delhi",
    name: "Ishita",
    age: 19,
    interests: [
      {
        icon: `<i class="ri-ball-pen-fill"></i>`,
        interest: "writing",
      },
      {
        icon: `<i class="ri-code-box-fill"></i>`,
        interest: "coding",
      },
    ],
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio suscipit velit Odio suscipit velit voluptatum id? Modi, esse?",
    isFriend: null,
  },
  {
    profilePic: "",
    displayPic: "./assets/image3.jpg",
    pendingMessage: 3,
    location: "India, Gujarat",
    name: "Avaniya",
    age: 21,
    interests: [
      {
        icon: `<i class="ri-phone-fill"></i>`,
        interest: "cooking",
      },
      {
        icon: `<i class="ri-auction-fill"></i>`,
        interest: "baking",
      },
    ],
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing suscipit velit voluptatum id? Modi, esse?",
    isFriend: null,
  },
  {
    profilePic: "",
    displayPic: "./assets/image4.jpg",
    pendingMessage: 9,
    location: "India, Bhopal",
    name: "Shreya",
    age: 20,
    interests: [
      {
        icon: `<i class="ri-suitcase-3-fill"></i>`,
        interest: "traveling",
      },
      {
        icon: `<i class="ri-ie-fill"></i>`,
        interest: "exploring",
      },
    ],
    bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio suscipit velit dolor sit amet consectetur voluptatum id? Modi, esse?",
    isFriend: null,
  },
  {
    profilePic: "",
    displayPic: "./assets/image5.jpg",
    pendingMessage: 6,
    location: "USA, Canada",
    name: "Olivia",
    age: 25,
    interests: [
      {
        icon: `<i class="ri-handbag-fill"></i>`,
        interest: "fashion",
      },
      {
        icon: `<i class="ri-magic-fill"></i>`,
        interest: "beauty",
      },
    ],
    bio: "Lorem ipsum, dolor sit amet consectetur elit dolor sit amet consectetur. Odio suscipit esse?",
    isFriend: null,
  },
];

function select(elem) {
  return document.querySelector(elem);
}

let curr = 0;
let isAnimating = false;

function setData(index) {
  select(".location h3").textContent = users[index].location;
  select(".badge h5").textContent = users[index].pendingMessage;
  select(".name h1:nth-child(1)").textContent = users[index].name;
  select(".name h1:nth-child(2)").textContent = users[index].age;

  let clutter = "";
  users[index].interests.forEach(function (interest) {
    clutter += `<div class="tag text-white flex items-center bg-white/50 px-3 py-1 rounded-full gap-2">
      ${interest.icon}
      <h3 class="text-sm tracking-tight capitalize">${interest.interest}</h3>
      </div>`;
  });
  select(".tags").innerHTML = clutter;

  select(".bio p").textContent = users[index].bio;
}

(function setIntial() {
  select(".maincard img").src = users[curr].displayPic;
  select(".incoming-card img").src = users[curr + 1]?.displayPic;
  setData(curr);
  curr = 2;
})();

function imageChange() {
  if (!isAnimating) {
    isAnimating = true;
    let tl = gsap.timeline({
      onComplete: function () {
        isAnimating = false;
        let main = select(".maincard");
        let incoming = select(".incoming-card");

        incoming.classList.remove("z-[2]");
        incoming.classList.add("z-[3]");
        incoming.classList.remove("incoming-card");

        main.classList.remove("z-[3]");
        main.classList.add("z-[2]");
        gsap.set(main, {
          scale: 1,
          opacity: 1,
        });

        if (curr === users.length) curr = 0;
        select(".maincard img").src = users[curr].displayPic;
        curr++;
        main.classList.add("incoming-card");
        main.classList.remove("maincard");
        incoming.classList.add("maincard");
        incoming.classList.add("maincard");
      },
    });

    tl.to(
      ".maincard",
      {
        scale: 1.1,
        opacity: 0,
        ease: "0.16, 1, 0.3, 1",
        duration: 0.9,
      },
      "anim"
    );
    tl.from(
      ".incoming-card",
      {
        scale: 0.9,
        opacity: 0,
        ease: "0.16, 1, 0.3, 1",
        duration: 1.1,
      },
      "anim"
    );
  }
}

let deny = select(".deny");
let accept = select(".accept");

deny.addEventListener("click", function () {
  imageChange();
  setData(curr - 1);
  gsap.from(".details .element", {
    y: "100%",
    ease: Power4.easeInOut,
    stagger: 0.05,
    duration: 1.5,
  });
});

accept.addEventListener("click", function () {
  imageChange();
  setData(curr - 1);
  gsap.from(".details .element", {
    y: "100%",
    ease: Power4.easeInOut,
    stagger: 0.05,
    duration: 1.5,
  });
});

(function containerCreator() {
  document.querySelectorAll(".element").forEach(function (element) {
    let div = document.createElement("div");
    div.classList.add(`${element.classList[1]}container`, `overflow-hidden`);
    div.appendChild(element);
    select(".details").appendChild(div);
  });
})();
