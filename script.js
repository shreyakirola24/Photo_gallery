document.addEventListener('DOMContentLoaded', function() {
    const fullImgBox = document.getElementById("fullImgBox");
    const fullImg = document.getElementById("fullImg");
    const caption = document.getElementById("caption");
    const galleryImages = document.querySelectorAll('.img-gallery img');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    let currentIndex;

    galleryImages.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img.src;
        thumbnail.alt = img.alt;
        thumbnail.setAttribute('data-index', index);
        thumbnail.addEventListener('click', function() {
            openFullImg(index);
        });
        thumbnailContainer.appendChild(thumbnail);
    });

    document.querySelector('.img-gallery').addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            currentIndex = Array.from(galleryImages).indexOf(event.target);
            openFullImg(currentIndex);
        }
    });

    function openFullImg(index) {
        fullImgBox.style.display = 'flex';
        fullImg.src = galleryImages[index].src;
        caption.textContent = galleryImages[index].getAttribute('data-caption');

        updateShareLinks(fullImg.src, caption.textContent);
    }

    function closeFullImg() {
        fullImgBox.style.display = 'none';
    }

    function nextImg() {
        if (currentIndex < galleryImages.length - 1) {
            currentIndex++;
            openFullImg(currentIndex);
        }
    }

    function prevImg() {
        if (currentIndex > 0) {
            currentIndex--;
            openFullImg(currentIndex);
        }
    }

    function applyFilter(filter) {
        fullImg.style.filter = filter;
    }

    function toggleZoom() {
        fullImg.classList.toggle('zoomed');
    }

    function updateShareLinks(imageUrl, captionText) {
        const encodedUrl = encodeURIComponent(imageUrl);
        const encodedCaption = encodeURIComponent(captionText);

        document.getElementById('share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        document.getElementById('share-twitter').href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedCaption}`;
        document.getElementById('share-pinterest').href = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedUrl}&description=${encodedCaption}`;
        document.getElementById('share-instagram').href = `https://www.instagram.com/?url=${encodedUrl}`;
    }

    fullImg.addEventListener('click', toggleZoom);

    fullImgBox.addEventListener('click', function(event) {
        if (event.target.tagName !== 'IMG' && event.target.tagName !== 'SPAN') {
            closeFullImg();
        }
    });

    window.nextImg = nextImg;
    window.prevImg = prevImg;
    window.closeFullImg = closeFullImg;
    window.applyFilter = applyFilter;
});
