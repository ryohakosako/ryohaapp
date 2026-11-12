// ここにアプリを追加してください。
// url: 公開済みアプリのURL。未公開なら空文字にします。
// versionUrl: アプリが公開する version.json のURL。
// 空文字の場合はバージョン表示を省略します。
// 外部ドメインの version.json は CORS の許可が必要です。
window.APP_LIST = [
  {
    id: 'iroirokiroku',
    name: 'いろいろきろく',
    description: '活動・勤務時間・給与をまとめて記録できるWebアプリ。',
    icon: 'calendar',
    url: 'https://ryohakosako.github.io/iroirokiroku/',
    versionUrl: 'https://ryohakosako.github.io/iroirokiroku/version.json',
    changelogUrl: 'https://ryohakosako.github.io/iroirokiroku/changelog/',
    status: 'published' // 'published' または 'development'
  }
   {
    id: 'ryohaoc',
    name: '#ryohaoc',
    description: '活動・勤務時間・給与をまとめて記録できるWebアプリ。',
    icon: 'calendar',
    url: 'https://ryohakosako.github.io/ryohaoc/',
    versionUrl: 'https://ryohakosako.github.io/ryohaoc/version.json',
    changelogUrl: 'https://ryohakosako.github.io/ryohaoc/changelog/',
    status: 'published' // 'published' または 'development'
  }
];
