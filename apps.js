// ここにアプリを追加してください。
// url: 公開済みアプリのURL。未公開なら空文字にします。
// versionUrl: アプリが公開する version.json のURL。
// 空文字の場合はバージョン表示を省略します。
// 外部ドメインの version.json は CORS の許可が必要です。
window.APP_LIST = [
  {
    id: 'tsumilog',
    name: '積みログ',
    category: 'TRACKER',
    description: '活動・勤務時間・給与をまとめて記録できるWebアプリ。',
    icon: 'calendar',
    url: '', // 例: 'https://YOURNAME.github.io/tsumilog/'
    versionUrl: '', // 例: 'https://YOURNAME.github.io/tsumilog/version.json'
    changelogUrl: '', // 例: 'https://YOURNAME.github.io/tsumilog/changelog/'
    status: 'development' // 'published' または 'development'
  }
];
