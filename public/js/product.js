// const product = document.getElementById('Product');
const course = localStorage.getItem("usercourse");
const username = localStorage.getItem("username");
console.log(course);
const product = document.getElementById("introduction_points");
const productrating = document.getElementById("product_rating");
const productDescription = document.getElementById("course_description");
const productTitle = document.getElementById("course_title");
const productVideo = document.getElementById("course_video");
const build_description = document.getElementById("build_description");

const coursename = localStorage.getItem("usercourse");
const data = [];

axios
  .get(`/course/${course}`, {
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  })
  .then((res) => {
    const url = res.data.data;
    console.log(res);
    console.log(url.displayName);

    // introduction

    const html = url.introduction
      .map((item) => {
        return `<p class="head_right_section_point">
        ✔️ ${item}.
     </p>`;
      })
      .join("");
    product.innerHTML = html;

    // videos

    productVideo.innerHTML = ` <iframe class="video_link" src=${url.video} title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;

    // videos

    // title

    productTitle.innerHTML = `${url.displayName}`;

    // title

    // Rating
    const rating = Math.round(url.rating);

    const star_rating = Array(rating)
      .fill()
      .map(() => `⭐`);
    const ratinghtml = star_rating
      .map((item) => {
        return `<span>${item}</span>`;
      })
      .join("");
    productrating.innerHTML = `${ratinghtml}<span class="rating_value">${rating}</span>`;

    // Rating

    // description

    productDescription.innerHTML = `${url.description}`;

    // description

    // build_description

    build_description.innerHTML = `${url.buildDescription}`;
    // build_description
  })
  .catch((err) => {
    console.log(err);
  });

console.log(data);

// console.log(product);

// const html=``

// product.innerHTML = html;
