// =============================================
// VERSION UPDATE
// UPDATE TERAKHIR 30 September 2024 JAM 00:00 WIB
// WEBSITE : ヌール・アニア-𝐇𝐢𝐠𝐚𝐦𝐢'
// VERSION : 3.5.3
// =============================================



const path=require("path"),fs=require("fs"),chalk=require("chalk"),moment=require("moment-timezone");

const config = {
    botDestination  : 'group', // group |  private | both
    region       	: 'indonesia',
    resbot_version  : 'ヌール・アニア-𝐇𝐢𝐠𝐚𝐦𝐢 v3.5.3',
    apikey_resbot   : 'ec6cff716568c43926a11ed2', // apikey beli di autoresbot.com
    nomorsuperOwner : '6285135723505',
    grup            : 'https://chat.whatsapp.com/JPMjh22k31aJaWK8MGnLxb',
    email           : 'ヌール・アニア-𝐇𝐢𝐠𝐚𝐦𝐢@gmail.com',
    ig           	: '@mftchlilmi_',
    ownername       : 'ɪʟᴍɪ X ꜱᴛᴏʀᴇᴇ',
    botname         : 'ヌール・アニア-𝐇𝐢𝐠𝐚𝐦𝐢',
    packname        : 'ヌール・アニア-𝐇𝐢𝐠𝐚𝐦𝐢',
    sleep_game      : 60000, // waktu main tebak (1000 = 1 detik)
    limit_tunggu 	: 10, // ini menit = 10 menit setiap setelah claim
    MoneyMenangGame : 20,
    ratelimiter 	: 4, // detik
    prefix_custom   : ['#','!','.'],
    dalamdetik		: 5, // ini adalah waktu couldown dalamdetik
    chatmasuk 		: 5, // ini adalah jumlah chat maxsimum {dalamdetik}
    prefix 			: true,
    anticall        : true, // true = aktif || false = tidak aktif
    publik 			: true,
    audio_menu      : false,
    autoread 		: false,
    antitoxic 		: true,
    savekontak		: {
    format   	: 'Buyer @urutan - @tanggal @bulan @tahun',
    mulai 		: '1',
    },
    author          : `Date: ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}\nYouTube: ヌール・アニア-𝐇𝐢𝐠𝐚𝐦𝐢'\nBot: 081545626215`,
    allmenu         : 'https://autoresbot.com/tmp_files/b67ed161-8bb6-44da-a8d9-211747c16335.jpg',
    typeWelcome 	: '1', // ada 3 pilihan angka 1 = image pp user  2 = image welcome custom   || 3 = teks only
    icon_on			: '🟢', 
	icon_off		: '🔴',
    game 			: {
        tebakangka   : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg',
        tebaklontong : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg',
        tebakkalimat : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg',
        tebaklirik   : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg',
        tebakkata    : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg',
        tebakbendera : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg',
        tebakgambar  : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg',
        tebaklagu    : 'https://autoresbot.com/tmp_files/87f667eb-066e-414e-94a0-3c7732c59ce5.jpg'
    },
    PANEL            : {
        URL             : '', // https://panel.contoh.com
        KEY_APPLICATION : '', // ambil di panel : ptla_xxxxx
        SERVER_EGG      : '15',
        port_range      : '1900-2000',
        id_location     : '5', // id location -> ambil di panel
        cpu_default     : 90, // unlimited ganti 0
        disk_default    : 5120, // 5 gb || unlimited ganti 0
        description     : 'Jika Ada Pertanyaan Hubungi Telegram Admin : ',
        access          : 'owner' , // owner, premium,
    },
    BACKUP          : {
        autobackup : false, // true atau false
        autosendwa : true
    }
};



module.exports = config;

let file = path.resolve(__filename);
fs.watchFile(file,(()=>{fs.unwatchFile(file),console.log(`${chalk.greenBright.bold("ᴜᴘᴅᴀᴛᴇ ꜰɪʟᴇ "+file)} ${chalk.redBright.bold("ᴘʟᴇᴀꜱᴇ ʀᴇꜱᴛᴀʀᴛ ᴛʜɪꜱ ꜱᴇʀᴠᴇʀ")}`),delete require.cache[file],require(file)}));













/* 
---- PENJELASAN ------ 
 // 🟢 🔴
true : artinya aktif
false : tidak aktif

jadi kalau
anticall        : true 
// artinya bot lu gak bisa di telpon // kalo ada orang nelpon lansung di block



untuk link yang seperti https://telegra.ph/file/4cd10be17fd6c13303453.jpg
kalau mau di ganti silakan upload gambar kalian dulu ke website https://telegra.ph
lalu nanti salin url gambarnya 


KALAU MAU NANYA NANYA CHAT https:/ admin/owner

*/
