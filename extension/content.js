chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.text === 'get_the_broodjes') {
        console.log('Starting...');
        fetch(
            'https://lq75qh43na.execute-api.eu-west-1.amazonaws.com/latest/getBroodjesVandaag'
        )
            .then(x => x.json())
            .then(bestelling => {
                const name = document.querySelectorAll('[name=your-name');
                name[0].value = 'thomas';

                const email = document.querySelectorAll('[name=your-email');
                email[0].value = 'thomas.maclean@marlon.be';

                const phone = document.querySelectorAll('[name=tel-950');
                phone[0].value = '09/1231212';

                const message = document.querySelectorAll('[name=your-message');
                message[0].value = bestelling
                    .map(b => `${b.user} : ${b.order}`)
                    .join('\n\r');

                const levering = document.querySelectorAll(
                    "[name='checkbox-935[]'"
                );
                levering[1].checked = true;

                const datum = document.querySelectorAll('[name=date-875]');
                const d = new Date();
                datum[0].value =
                    d.getDate() +
                    '-' +
                    (d.getMonth() + 1) +
                    '-' +
                    d.getFullYear();

                const hour = document.querySelectorAll('[name=menu-909]');
                hour[0].value = '12:00';

                const adres = document.querySelectorAll('[name=text-151]');
                adres[0].value =
                    'Pauline van Pottelsberghelaan 22 9051 Sint-Denijs-Westrem';
                const accept = document.querySelectorAll(
                    '[name=acceptance-556]'
                );
                // clicking tricks the form so we can submit it, setting to true does not work.
                accept[0].click();
                //accept[0].checked = true;
            });
    }
});
