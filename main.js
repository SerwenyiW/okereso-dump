if(window.location.href.toString() === "https://okereso.hu/" || window.location.href.toString().includes("https://okereso.hu/iskola")) {
    const button = document.createElement("button");
    button.style.cssText = "font-size: 30px; width: 150px; height: 100px; color: black; background-color: gray; border: 0;position: absolute; top: 0; z-index: 999";
    button.textContent = "Dump";
    button.addEventListener("click", ()=>{
        if(getCookie("odumprunning") === "true") {
            setCookie("odumprunning", "false");
        } else {
            setCookie("odumprunning", "true");
            window.location.href = "https://okereso.hu/iskola/1";
        }
    });
    document.body.appendChild(button);
}

function setCookie(name, value) {
    document.cookie = `${name}=${value}`;
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  setCookie("odumprunning", "false");
  return "false";
}

if(window.location.href.toString().includes("https://okereso.hu/iskola")) {
    var link = window.location.href.toString().split("iskola/")[1];

    const error = document.querySelector(".error p");
    if(error) {
         console.log("Nem jelentkeztek ebbe az iskolába még.");
         if(getCookie("odumprunning") === "true") window.location.href = "https://okereso.hu/iskola/" + (parseInt(link)+1);
    }

    const uploaderCards = document.querySelectorAll(".uploader-card");
    const uploaders = Array.from(uploaderCards).map(card => {
        const date = card.querySelector(".date").textContent;
        const name = card.querySelector(".name").textContent;
        
        const socials = Array.from(card.querySelectorAll(".socials .social")).map(social => {
            const platform = social.querySelector("img").src.toString().includes("snapchat") ? "Snapchat: " : social.querySelector("img").src.toString().includes("instagram") ? "Instagram: " : social.querySelector("img").src.toString().includes("tiktok") ? "Tiktok: " : "Facebook: ";
            const username = social.querySelector("span").textContent;
            return { platform, username };
        });
        const description = card.querySelector(".description .text").textContent;
        return { date, name, socials, description };
    });

    for (let u=0;u<uploaders.length;u++) {
        let user = uploaders[u];
        let messageBuild = `=================================\nNév: ${user.name}\nIskola: ${document.querySelector(".school-name").textContent}\nSzak: ${user.description.toString()}`;
        for(let i=0;i<user.socials.length;i++) {
            messageBuild += `\n${user.socials[i].platform} ${user.socials[i].username}`
        }
        messageBuild += "\n=================================";
        console.log(messageBuild);
    }
    console.log(`Ennyien mennek ebbe az iskolába: ${uploaders.length}`);

    if(getCookie("odumprunning") === "true") {
        setTimeout(()=>{
            window.location.href = "https://okereso.hu/iskola/" + (parseInt(link)+1);
        }, 1200);
    }
}

