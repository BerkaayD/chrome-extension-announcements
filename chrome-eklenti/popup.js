const hostUrl = "https://ostimteknik.edu.tr";

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('Container');
    const Message = document.getElementById('message');

    if (!container) {
        console.error("Container elementi bulunamadı!");
        return;
    }

    function duyurular(htmlData) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlData, 'text/html');

        const xpathExpression = '//*[@id="o_wblog_posts_loop"]/div/div[*]/article/div[1]';
        const result = doc.evaluate(
            xpathExpression,
            doc,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        const xpathExpression2 = '//*[@id="o_wblog_posts_loop"]/div/div[*]/article/div[4]/div/div/time';
        const dates = doc.evaluate(
            xpathExpression2,
            doc,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        const xpathExpression3 = '//*[@id="o_wblog_posts_loop"]/div/div[*]/article/div[2]/a';
        const links = doc.evaluate(
            xpathExpression3,
            doc,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        container.innerHTML = '';

        if (result.snapshotLength > 0) {
            for (let i = 0; i < result.snapshotLength; i++) {
                const announcement = result.snapshotItem(i);
                const date = dates.snapshotItem(i);
                const link = hostUrl + links.snapshotItem(i).getAttribute('href');

                const div = document.createElement('div');
                div.classList.add('announcement');
                div.innerHTML = `<p><a href="${link}" target="_blank">${announcement.textContent} (${date.textContent})</a></p>`;
                container.appendChild(div);
            }
        } else {
            container.innerHTML = '<p class="message">Şu anda gösterilecek duyuru bulunmamaktadır.</p>';
        }
    }

    async function loadAnnouncements() {
        if (Message) {
            Message.textContent = "Yükleniyor...";
            Message.classList.remove('error-message');
            Message.classList.add('message');
        } else {
            container.innerHTML = '<p class="message">Yükleniyor...</p>';
        }

        try {
            const response = await fetch(hostUrl + '/blog/duyuru-5772');
            if (!response.ok) {
                throw new Error(`HTTP Hata! Durum kodu: ${response.status}`);
            }
            const data = await response.text();

            duyurular(data);

        } catch (error) {
            console.error("Duyurular yüklenirken hata oluştu:", error);
            if (Message) {
                Message.textContent = 'Duyurular yüklenemedi. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.';
                Message.classList.add('error-message');
                Message.classList.remove('message');
            } else {
                container.innerHTML = '<p class="error-message">Duyurular yüklenemedi. Lütfen internet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.</p>';
            }
        }
    }
    loadAnnouncements();
});