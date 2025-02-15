if(window.location.href.toString().includes("https://okereso.hu/search")) {
    const button = document.createElement("button");
    button.style.cssText = "font-size: 30px; width: 150px; height: 100px; color: black; background-color: gray; border: 0;position: absolute; top: 0; z-index: 999";
    button.textContent = "Dump";
    button.addEventListener("click", ()=>{
        if(getCookie("odumprunning") === "true") {
            setCookie("odumprunning", "false");
        } else {
            setCookie("odumprunning", "true");
            //window.location.href = "https://okereso.hu/search/1";
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

async function init() {
    if(window.location.href.toString().includes("https://okereso.hu/search")) {
        var link = window.location.href.toString().split("search/")[1];

        const vannak = document.querySelector(".z-10.py-5.opacity-50.drop-shadow-2xl");
        if(vannak.textContent.includes("Nincsenek")) {
            console.log("Nem jelentkeztek ebbe az iskolába");
            if(getCookie("odumprunning") === "true") {
                setTimeout(() => {
                    window.location.href = "https://okereso.hu/search/" + (parseInt(link) + 1);
                }, 2000);
            }
        }

        const diakok = document.querySelectorAll('.h-90.my-2.w-full.rounded-3xl.bg-card-100.border-b-\\[5px\\].border-primary\\/85.drop-shadow-2xl.max-w-4xl.p-5');
        const diak = Array.from(diakok).map(adat => {
            const nev = adat.querySelector(".pt-3.text-left.font-bold").textContent;
            const szakma = adat.querySelectorAll(".py-1.text-left")[0].textContent;
            const magamrol = adat.querySelectorAll(".py-1.text-left")[1].textContent;
            linkEleres = (selector, isLink = true) => {
                return Array.from(adat.querySelectorAll(selector)).map(soc => {
                    const nev = soc.textContent;
                    let platform = "";
                    const href = soc.getAttribute("href") || "";
                    if(isLink) {
                        if (href.includes("instagram")) platform = "Instagram:";
                        else if (href.includes("tiktok")) platform = "Tiktok:";
                    } else {
                        platform = nev.split(" ").length >= 2 ? "Facebook:" : "Snapchat/Discord:";
                    }
                    return { platform, nev };
                });
            }
            
            const eleres = [
                ...linkEleres(".flex.flex-wrap.gap-2.py-2 a", true),
                ...linkEleres(".flex.flex-wrap.gap-2.py-2 div span", false)
            ];
            console.log(nev);
            console.log(szakma);
            return { nev, szakma, magamrol, eleres }
        });
       
        for (let u=0;u<diak.length;u++) {
            let user = diak[u];
            let messageBuild = `\`\`\`=================================\nNév: ${user.nev}\nIskola: ${document.querySelector('.z-10.font-primary.text-3xl.font-extrabold.leading-snug.drop-shadow-2xl.\\[text-shadow\\:_0_4px_4px_rgb\\(0_0_0_\\/_0\\.3\\)\\]').textContent}\nSzakma: ${user.szakma}\nMegjegyzés: ${user.magamrol}`;
            for(let i=0;i<user.eleres.length;i++) {
                messageBuild += `\n${user.eleres[i].platform} ${user.eleres[i].nev}`
            }
            messageBuild += "\n=================================```";
            discorduzenet(messageBuild)
            diak.splice(u, 1);
            u--;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }

        console.log(diak.length);
        if (diak.length == 0 && getCookie("odumprunning") === "true" && !document.querySelector(".z-10.py-5.opacity-50.drop-shadow-2xl").textContent.includes("Nincsenek")) {
            discorduzenet(`Ennyien mennek a **${document.querySelector('.z-10.font-primary.text-3xl.font-extrabold.leading-snug.drop-shadow-2xl.\\[text-shadow\\:_0_4px_4px_rgb\\(0_0_0_\\/_0\\.3\\)\\]').textContent}** iskolába: ${document.querySelector(".z-10.py-5.opacity-50.drop-shadow-2xl").textContent}`);
            setTimeout(() => {
                window.location.href = "https://okereso.hu/search/" + (parseInt(link) + 1);
            }, 5000);
        }
    }
}
init();

function discorduzenet(messageBuild) {
    const message = {
        content: messageBuild,
        username: "Okereső dumper",
        avatar_url: "https://cdn.discordapp.com/attachments/1340267513023430747/1340268574664560671/logo-blackboard.png"
    };

    fetch("DISCORD_WEBHOOK", {method: "POST",headers: { "Content-Type": "application/json"},
    body: JSON.stringify(message)
    }).catch(error => console.error("Fetch hiba:", error));
}
