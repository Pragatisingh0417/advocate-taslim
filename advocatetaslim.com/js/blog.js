
  
////////////////////////////   fetch blogss//////////////////////////////


fetch("http://localhost:8000/api/blogs")
  .then(res => res.json())
  .then(data => {

    const blogs = Array.isArray(data) ? data : data.blogs;
    const container = document.getElementById("blogss");

    if (!blogs || blogs.length === 0) {
      container.innerHTML = "<p>No blogs found</p>";
      return;
    }

    container.innerHTML = "";

    blogs.forEach(blog => {
      container.innerHTML += `
      
      <div class="col-md-4 mb-4">
        <div class="blog-card">

          ${blog.image 
            ? `<img src="http://localhost:8000/${blog.image}" class="img-fluid rounded">`
            : ""
          }

          <div class="blog-content">
            <h2 class="headeng-card">${blog.heading}</h2>
            <p class="paragraph-23">${blog.short_description} ....</p>
            <a href="blog-details.html?slug=${blog.slug}" class="btn btn-primary">Read More</a>
          </div>

        </div>
      </div>

      `;
    });

  })
  .catch(err => console.error("FETCH ERROR:", err));


////////////////////////////////   fetch blogs details     ///////////////////////////


const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const container = document.getElementById("blog-detailsss");

if (!slug) {
  container.innerHTML = "<p>Blog not found</p>";
  throw new Error("Slug missing");
}

fetch(`http://localhost:8000/api/blogs/slug/${slug}`, {
    method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
  }
})
  .then(res => res.json())
  .then(blog => {

    console.log("BLOG DATA:", blog);
    console.log("Slug:", slug);

    if (!blog || blog.message === "Blog not found") {
      container.innerHTML = "<p>Blog not found</p>";
      return;
    }

    container.innerHTML = `
    <link href="css/color-themes/default-theme.css" rel="stylesheet">
<section class="page-title" style="background-image:url(images/background/9.jpg)">
    <div class="auto-container">
         <h1>${blog.heading}</h1>
        <ul class="page-breadcrumb">
            <li>You are here:</li>
            <li><a href="index.html">Home</a></li>
            <li>${blog.heading}</li>
        </ul>
    </div>
</section>
<section class="news-section">
    <div class="auto-container">

        <div class="sec-title">
            <h1>${blog.heading}
            </h1>
        </div>

        <!-- Featured Image -->
        <div class="featured-image">
               ${blog.image
        ? `<img src="http://localhost:8000/${blog.image}" class="img-fluid mb-3 alt="Court Marriage Advocate in Ghaziabad"">`
        : ""
      }
        </div>

        <!-- Blog Content -->
        <div class="blog-content">
        ${blog.long_description}
        </div>

        <!-- Contact -->
            <div class="contact-section">
                <h4><span class="theme_color">Inquiries</span></h4>
                <p>
                    Website: <a href="https://advocatetaslim.com/" style="color:red;">www.advocatetaslim.com</a><br>
                    Call: <a href="tel:+917678336800">+91 7678336800</a> | 
                          <a href="tel:+918826552527">+91 8826552527</a><br>
                    Email: <a href="mailto:tsaifi6@gmail.com">tsaifi6@gmail.com</a>
                </p>
            </div>

        </div>
    </div>
</section>
    `;
    
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = "<p>Error loading blog</p>";
  });