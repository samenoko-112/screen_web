// Unsplash APIからランダムな画像を取得して背景に設定
const setRandomBackground = () => {
    fetch('https://source.unsplash.com/random/1920x1080')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            return response.url;
        })
        .then(imageUrl => {
            document.body.style.backgroundImage = `url(${imageUrl})`;
        })
        .catch(error => {
            console.error('Error fetching image:', error);
        });
};

// 時刻と日付を更新する関数
const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}/${month}/${day}`;

    document.getElementById('time').innerText = timeString;
    document.getElementById('date').innerText = dateString;
};

// 時計の位置をランダムに変更する関数
const moveClock = () => {
    const clock = document.getElementById('clock');
    const bodyWidth = document.body.offsetWidth;
    const bodyHeight = document.body.offsetHeight;
    const clockWidth = clock.offsetWidth;
    const clockHeight = clock.offsetHeight;

    // 画面内のランダムなX座標とY座標を計算
    const randomX = Math.floor(Math.random() * (bodyWidth - clockWidth));
    const randomY = Math.floor(Math.random() * (bodyHeight - clockHeight));

    // 時計の位置を設定
    clock.style.left = `${randomX}px`;
    clock.style.top = `${randomY}px`;
};

// 初期設定と定期的な更新
document.addEventListener('DOMContentLoaded', () => {
    setRandomBackground();
    updateClock();
    moveClock();
    setInterval(updateClock, 1000); // 毎秒時刻を更新
    setInterval(setRandomBackground, 60000); // 60秒ごとに背景を更新
    setInterval(moveClock, 60000)
});

// キーボードイベントを監視し、Fキーが押されたときに全画面表示に切り替える
document.addEventListener('keydown', (event) => {
    if (event.key === 'F' || event.key === 'f') {
        toggleFullScreen();
    }
});

// 全画面表示を切り替える関数
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}
