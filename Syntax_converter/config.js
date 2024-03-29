module.exports = {
  controllers: [
    {
      ngController: 'XMPPersonalizedPage',
      controller: 'xmp-personalized-controller',
    },
    {
      ngController: 'XMPAnonymousPage',
      controller: 'xmp-anonymous-controller',
    },
  ],
  directives: [
    'xmp-anonymous-controller',
    'xmp-turn-off-default-error',
    'xmp-cloak',
    'xmp-success-trigger',
    'xmp-class',
    'xmp-clicked-trigger',
    'xmp-success-url',
    'xmp-failure-url',
    'xmp-success-js',
    'xmp-failure-js',
    'xmp-password',
    'xmp-confirm-password',
    'xmp-confirm-error',
    'xmp-write-ador',
    'xmp-default-value',
    'xmp-href',
    'xmp-image-asset',
    'xmp-tracking-page-name',
    'xmp-personalized-controller',
    'xmp-register',
    'xmp-show',
    'xmp-src',
    'xmp-text',
    'xmp-update',
    'xmp-refer',
    'xmp-repeat',
    'xmp-true-value',
    'xmp-false-value',
    'xmp-success-track-action',
    'xmp-failure-track-action',
    'xmp-tracking-action',
    'xmp-async',
    'xmp-load-async-ador',
    'xmp-unsubscribe',
    'xmp-no-caching',
    'xmp-clicked-triggered',
    'xmp-update-on-page-load',
    'xmp-load-ador',
    'xmp-remember-recipient',
    'xmp-signin',
    'xmp-signuot',
    'xmp-text-asset',
    'xmp-html-asset',
    'xmp-video',
  ],
  version: '5.0',
  libUrl: 'https://ajax.xmcircle.com/ajax/libs/XMPL-V5/5.0/xmpl.min.js',
}
