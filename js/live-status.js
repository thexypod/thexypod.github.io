// Live Status
fetch("https://decapi.me/twitch/uptime/TheXyPod")
.then(res => res.text())
.then(text => {
    if (!text.includes("offline")) {
    const statusIcon = document.getElementById('live-status__icon');
    const statusText = document.getElementById('live-status__info-text');
    statusIcon.innerHTML = "🔴";
    statusIcon.classList.add('live');
    statusText.innerHTML = "TheXyPod is Live!"
    console.log(text);
    }
});