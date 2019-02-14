var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?delicedupain\.com/;

chrome.browserAction.onClicked.addListener(function(tab) {
    if (urlRegex.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, { text: 'get_the_broodjes' });
    }
});
