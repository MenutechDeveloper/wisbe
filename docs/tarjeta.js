// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Back to top
const toTop = document.getElementById('toTop');
toTop.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));

// Reveal animations (enter & exit)
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const el = entry.target;
    if(entry.isIntersecting){
      el.classList.add('is-in');
      el.classList.remove('is-out');
    }else{
      // Animate out when leaving viewport
      el.classList.remove('is-in');
      el.classList.add('is-out');
    }
  });
},{ threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// Testimonial slider (one visible, auto-advance)
const track = document.querySelector('.slider__track');
const slides = Array.from(document.querySelectorAll('.slide'));
let index = 0;

function go(i){
  index = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
}

let timer = setInterval(()=> go(index+1), 3800);

track.addEventListener('pointerdown', ()=> { clearInterval(timer); }); // pause on user interaction
track.addEventListener('pointerup',  ()=> { timer = setInterval(()=> go(index+1), 3800); });

// Optional: swipe gesture for mobile
let startX = 0;
track.addEventListener('touchstart',(e)=> startX = e.touches[0].clientX, {passive:true});
track.addEventListener('touchend',(e)=>{
  const dx = e.changedTouches[0].clientX - startX;
  if(Math.abs(dx) > 40){ go(index + (dx < 0 ? 1 : -1)); }
}, {passive:true});

document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".social-icon");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.3 }
  );

  icons.forEach((icon) => observer.observe(icon));
});
