// https://developers.google.com/web/fundamentals/getting-started/codelabs/push-notifications/

'use strict';

self.addEventListener('install', function(event) {
    self.skipWaiting();
    //console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
    //console.log('Activated', event);
});

self.addEventListener('push', function(event) {
    const promiseChain = Promise.resolve(event.data.json())
        .then(function (data) {
            var title = data.notification.title;
            var mustShowNotification = data.show;

            clients.matchAll({includeUncontrolled: true, type: 'window'}).then(function (clients) {
                for (var i = 0; i < clients.length; i++) {
                    var client = clients[i];
                    //var msg_chan = new MessageChannel();
                    client.postMessage(data.data);
                }
            });
            if (mustShowNotification) {
                event.waitUntil(
                    //SHOWING NOTIFICATION
                    self.registration.showNotification(title, {
                        'body': data.notification.body,
                        'icon': data.notification.icon
                    })
                );
            }
        });
    event.waitUntil(promiseChain);

});


// HANDLE NOTIFICATION CLICK
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag', event.notification.tag);
    // Android doesn't close the notification when you click it
    // See http://crbug.com/463146
    event.notification.close();
    var url = 'https://youtu.be/gYMkEMCHtJ4';
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
            .then(function(windowClients) {
                console.log('WindowClients', windowClients);
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    console.log('WindowClient', client);
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});