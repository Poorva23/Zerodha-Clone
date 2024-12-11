// import React from "react";
// import {Link} from "react-router-dom";

// function Navbar() {
//   return (
//     <nav
//       class="navbar navbar-expand-lg border-bottom"
//       style={{ backgroundColor: "#FFF" }}
//     >
//       <div class="container p-2">
//         <Link class="navbar-brand" to="/">
//           <img
//             src="media/images/logo.svg"
//             style={{ width: "25%" }}
//             alt="Logo"
//           />
//         </Link>
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//           <form class="d-flex" role="search">
//             <ul class="navbar-nav mb-lg-0">
//               <li class="nav-item">
//                 <Link class="nav-link active" aria-current="page" to="/signup">
//                   Signup
//                 </Link>
//               </li>
//               <li class="nav-item">
//               <Link class="nav-link active" aria-current="page" to="/about">
//                   About
//                 </Link>
//               </li>
//               <li class="nav-item">
//               <Link class="nav-link active" aria-current="page" to="/product">
//                   Product
//                 </Link>
//               </li>
//               <li class="nav-item">
//               <Link class="nav-link active" aria-current="page" to="/pricing">
//                   Pricing
//                 </Link>
//               </li>
//               <li class="nav-item">
//               <Link class="nav-link active" aria-current="page" to="/support">
//                   Support
//                 </Link>
//               </li>
//               <Link class="nav-link active" aria-current="page" to="/dashboard">
//                   Dashboard
//                 </Link>
//             </ul>
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <nav
      class="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div class="container p-2">
        <Link class="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex" role="search">
            <ul class="navbar-nav mb-lg-0">
              <li className="nav-item">
                <a 
                style={{ cursor: "pointer" }}
                className="nav-link active" onClick={() => window.location.href = "http://localhost:3001/signup"}>
                  Signup
                </a>
              </li>
              <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/product">
                  Product
                </Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/support">
                  Support
                </Link>
              </li>
              <li className="nav-item">
                <a 
                style={{ cursor: "pointer" }}
                className="nav-link active" onClick={() => window.location.href = "http://localhost:3001/dashboard"}>
                  Dashboard
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;