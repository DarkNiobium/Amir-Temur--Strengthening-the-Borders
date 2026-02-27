import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crown, Globe, Landmark, Scroll, ShieldAlert, Swords, ChevronRight, ChevronLeft, Compass } from 'lucide-react'
import InteractiveMap from './InteractiveMap'

const slides = [
  {
    id: 1,
    speaker: 'Amirxon',
    title: 'XIV asr oxirida vujudga kelgan xalqaro vaziyat',
    content: "XIV asr oxirida Markaziy Osiyo va unga tutash hududlarda siyosiy vaziyat nihoyatda murakkab edi. Mo‘g‘ullar imperiyasi parchalanib ketgan, Oltin O‘rda, Eron, Hindiston, Xitoy va boshqa hududlarda mustaqil davlatlar paydo bo‘lgan edi. Amir Temur mamlakat xavfsizligini ta’minlash, chegaralarni mustahkamlash va Buyuk Ipak yo‘lini himoya qilishni asosiy vazifa qilib qo‘ydi.",
    highlight: 'O\'rta Osiyo',
    icon: 'Globe',
    image: 'https://scontent.ftas1-1.fna.fbcdn.net/v/t1.6435-9/82941073_128142115570656_5662499902342505440_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9DvY8rHYqmUQ7kNvwFUKQqw&_nc_oc=AdkViv_pidw9Re38XdjniaKD0xmmgev7tOI37kQfm1TSP4HmPJXsv0p43CZOpFvRKGk&_nc_zt=23&_nc_ht=scontent.ftas1-1.fna&_nc_gid=aU2eOEkcjMOpHhXx6pPo-Q&oh=00_AfvIjatle4Tsm-gBwog-lWUbNhhMIe5jBMMvV2khGBIXeQ&oe=69BBD9A3'
  },
  {
    id: 2,
    speaker: 'Abubakr',
    title: 'To‘xtamishxonning taxtga chiqishi va xiyonati',
    content: "Amir Temur uhcun eng kuchli xavf  Oq O'rda va Oltin o'rda edi,XIV asr 70 yillarida Oq O'rda hokimlaridan biri Orusxon Jochi ulusini birlashtirib uni kuchayishga harakat qildi.Shu bois Temur kuchsizlantirishni jiddiy harakat boshladi.1376-yilda To'xtamishxon Amir Temurdan yordam so'radi,ammo berilgan yordam tezda unitildi va 1385-yilda Ozarbayjon egallashga harakat qildi.",
    highlight: 'Oltin O\'rda',
    icon: 'ShieldAlert',
    image: 'https://342031.selcdn.ru/rusplt/54/108/TohtamyshTamerlan.jpg'
  },
  {
    id: 3,
    speaker: 'Ibrohimjon',
    title: 'Terek daryosi bo‘yidagi jang',
    content: "1395-yilda Temur va To‘xtamish qo‘shinlari Terek daryosi bo‘yida hal qiluvchi jang olib bordilar. Jangda Temur qo‘shini puxta strategiya va intizom tufayli g‘alaba qozondi. To‘xtamish qo‘shini tor-mor etildi. Bu g‘alaba savdo yo‘llari xavfsizligini tikladi.",
    highlight: 'Terek Daryosi',
    icon: 'Swords',
    image: 'https://substackcdn.com/image/fetch/$s_!5f_8!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F2fbc4377-e558-4240-ae6b-8273cb00c65d_1200x830.jpeg'
  },
  {
    id: 4,
    speaker: 'Kamron',
    title: 'Hindistonga yurish va Dehlining egallanishi',
    content: "1398–1399-yillarda Temur Hindistonga harbiy yurish qildi. Maqsad: chegaralarni mustahkamlash va boyliklar. Temur qo‘shini Dehlini egalladi. Bu yurish natijasida Temur katta boyliklar bilan qaytdi va janubiy yo‘nalishdagi xavflar kamaydi.",
    highlight: 'Hindiston,Dehli',
    icon: 'Landmark',
    image: 'https://i.ytimg.com/vi/ppbdk3UPBlA/sddefault.jpg'
  },
  {
    id: 5,
    speaker: 'Mahmudaxon',
    title: 'Anqara jangi',
    content: "1402-yilda Temur va Usmonli turklar sultoni Boyazid I o‘rtasida Anqara yaqinida katta jang bo‘lib o‘tdi. Temur g‘alaba qozondi va Boyazid asirga olindi. Bu g‘alaba Temur davlatining g‘arbiy chegaralarini mustahkamladi va uning dunyo miqyosidagi obro‘sini oshirdi.",
    highlight: 'Anqara Jangi',
    icon: 'Crown',
    image: 'https://img-fotki.yandex.ru/get/769132/395936343.77/0_16acec_831d0338_orig.jpg'
  },
  {
    id: 6,
    speaker: 'Hadichabibi',
    title: 'Xitoy bilan munosabatlar',
    content: "Temur Xitoydagi Min sulolasi bilan diplomatik aloqalar o‘rnatgan. U Xitoy bilan harbiy to‘qnashuvdan ko‘ra, siyosiy va iqtisodiy aloqalarni kuchaytirishga harakat qilgan. Garchi yurish rejalashtirilgan bo'lsa-da, bu munosabatlar sharqiy chegaralarni barqaror saqlashga yordam berdi.",
    highlight: 'Xitoy',
    icon: 'Scroll',
    image: 'https://www.savol-javob.com/wp-content/uploads/2022/12/Amir-Temur-va-temuriylar-hukmronligi-davrida-ilm-fan-va-madaniyat..jpg'
  }
];

const iconMap = { Globe, ShieldAlert, Swords, Landmark, Crown, Scroll };
const MotionDiv = motion.div;

export default function Presentation() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const Icon = iconMap[slide.icon] || Globe;
  const [imageOrigin, setImageOrigin] = useState({ x: 50, y: 50 });

  const nextSlide = () => setIndex((p) => (p + 1) % slides.length);
  const prevSlide = () => setIndex((p) => (p - 1 + slides.length) % slides.length);
  const handleImageMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.min(100, Math.max(0, x));
    const clampedY = Math.min(100, Math.max(0, y));
    setImageOrigin({ x: clampedX, y: clampedY });
  };
  const resetImageOrigin = () => setImageOrigin({ x: 50, y: 50 });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F5E6D3] text-[#1a237e] font-sans selection:bg-[#B8860B] selection:text-white">
      {/* Background Texture - parchment paper feel */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} 
      />

      <main className="relative z-10 flex flex-col lg:flex-row h-screen p-4 lg:p-8 gap-6 lg:gap-12 items-center max-w-[1800px] mx-auto">
        
        {/* Left Panel: Narrative (Scroll Style) */}
        <div className="lg:w-[35%] flex flex-col justify-center h-full order-2 lg:order-1 relative">
          <AnimatePresence mode="wait">
            <MotionDiv
              key={slide.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-5 h-full justify-center"
            >
              {/* Header Badge */}
              <div className="flex items-center gap-3 text-[#8B4513] font-heading tracking-[0.2em] text-xs uppercase border-b border-[#8B4513]/20 pb-4">
                <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
                <span>Tarix Loyihasi • Slide 0{slide.id}</span>
              </div>

              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-[#2C1810] leading-tight drop-shadow-sm">
                {slide.title}
              </h1>

              {/* Content Card with Image */}
              <div className="relative p-6 rounded-xl bg-[#fff9f0] border border-[#8B4513]/20 shadow-[0_4px_20px_-2px_rgba(139,69,19,0.15)] flex flex-col gap-4">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#B8860B]/60 rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#B8860B]/60 rounded-br-lg"></div>
                
                {/* Historical Image Frame */}
                {slide.image && (
                  <div
                    className="relative w-full h-48 rounded-lg border-2 border-[#8B4513]/20 sepia-[.3] bg-[#F5E6D3]/60 overflow-visible group"
                    onMouseMove={handleImageMove}
                    onMouseLeave={resetImageOrigin}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-contain transition-transform duration-200 ease-out group-hover:scale-[2.5]"
                      style={{ transformOrigin: `${imageOrigin.x}% ${imageOrigin.y}%` }}
                    />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#F5E6D3] rounded-lg border border-[#8B4513]/10 shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-[#8B4513]" />
                  </div>
                  <p className="font-body text-base lg:text-lg text-[#2C1810]/90 leading-relaxed italic">
                    {slide.content}
                  </p>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-3 self-start px-4 py-2 rounded-lg bg-[#8B4513]/5 border border-[#8B4513]/20 text-[#8B4513] text-sm font-semibold">
                <Compass className="w-4 h-4 animate-pulse" />
                {slide.highlight}
              </div>

            </MotionDiv>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-[#8B4513]/10">
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-[#8B4513]/20 hover:border-[#B8860B] hover:bg-[#B8860B]/10 transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-[#8B4513] group-hover:text-[#B8860B]" />
                <span className="text-sm font-heading uppercase text-[#8B4513] group-hover:text-[#B8860B]">Oldingi</span>
              </button>
              <button 
                onClick={nextSlide}
                className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-[#8B4513]/20 hover:border-[#B8860B] hover:bg-[#B8860B]/10 transition-all"
              >
                <span className="text-sm font-heading uppercase text-[#8B4513] group-hover:text-[#B8860B]">Keyingi</span>
                <ChevronRight className="w-4 h-4 text-[#8B4513] group-hover:text-[#B8860B]" />
              </button>
            </div>
            
            <div className="flex gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-[#B8860B]' : 'w-2 bg-[#8B4513]/20 hover:bg-[#8B4513]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: REAL Interactive Map */}
        <div className="lg:w-[65%] h-[40vh] lg:h-full w-full relative order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2C1810] ring-1 ring-[#F5E6D3]/50">
          <InteractiveMap activeSlide={slide} />
          
          {/* Speaker Overlay on Map */}
          <div className="absolute top-6 left-6 z-[1000] flex items-center gap-3 bg-[#F5E6D3]/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#8B4513]/20 shadow-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#B8860B] to-[#CD7F32] flex items-center justify-center text-white font-bold font-serif shadow-inner">
              {slide.speaker[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#8B4513]/70 font-heading">Ma'ruzachi</span>
              <span className="text-[#2C1810] font-bold font-serif text-sm leading-none">{slide.speaker}</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
