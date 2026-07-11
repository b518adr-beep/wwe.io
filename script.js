/* ════════════════════════════════════════════════════════
   ✏️ قائمة أعمالك — عدّل هنا مباشرة لإضافة أعمال دائمة
   انسخ أي عنصر { ... } والصقه مع تغيير البيانات.
   img: رابط صورة الغلاف (اختياري — اتركه "" لغلاف تلقائي)
   ════════════════════════════════════════════════════════ */
const myWorks = [
  {
    title: "الدليل الشامل لأدوات الذكاء الاصطناعي",
    tag: "دليل أدوات",
    desc: "منصة عربية للبحث والمقارنة بين أفضل أدوات الذكاء الاصطناعي — أكثر من 100 أداة محدّثة يومياً في 5 تصنيفات.",
    link: "https://profile-site--ya517ay.replit.app/",
    img: "images/work-1.jpg"
  },
  {
    title: "Discover the Future of AI Tools",
    tag: "منصة ثنائية اللغة",
    desc: "دليل منسّق لأفضل أدوات الذكاء الاصطناعي بواجهة عربية/إنجليزية، مصمم لعشاق التقنية الناطقين بالعربية.",
    link: "https://ai-tool-directory--badrvip517.replit.app/",
    img: "images/work-2.jpg"
  },
  {
    title: "متجر التقنية والأناقة",
    tag: "متجر إلكتروني",
    desc: "متجر للمنتجات الذكية والإلكترونية بتجربة تسوق فريدة — أكثر من 3 آلاف منتج، 50 ألف عميل سعيد، ودعم فوري 24/7.",
    link: "",
    img: "images/work-3.jpg"
  }
];
/* ════════════ نهاية قائمة الأعمال ════════════ */

// تخزين آمن: يحفظ في المتصفح إن أمكن، وإلا في الذاكرة مؤقتاً
const store = (()=> {
  let mem = null;
  return {
    load(){ try{ const v = localStorage.getItem('badr_works'); return v ? JSON.parse(v) : mem; }catch(e){ return mem; } },
    save(d){ mem = d; try{ localStorage.setItem('badr_works', JSON.stringify(d)); }catch(e){} }
  };
})();

let works = store.load() || myWorks.slice();
let editIndex = -1;

const grid = document.getElementById('worksGrid');
const worksSection = document.getElementById('works');
const modalBack = document.getElementById('modalBack');
const modalTitle = document.getElementById('modalTitle');
const fTitle = document.getElementById('fTitle');
const fTag = document.getElementById('fTag');
const fDesc = document.getElementById('fDesc');
const fLink = document.getElementById('fLink');
const fImg = document.getElementById('fImg');

const covers = [
  "linear-gradient(135deg,#14B8A6,#0E7490)",
  "linear-gradient(135deg,#F5C36B,#D97706)",
  "linear-gradient(135deg,#818CF8,#4F46E5)",
  "linear-gradient(135deg,#F472B6,#BE185D)",
  "linear-gradient(135deg,#34D399,#059669)"
];
const esc = s => String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function render(){
  if(!works.length){
    grid.innerHTML = '<div class="works-empty">لا توجد أعمال بعد — فعّل «إدارة الأعمال» وأضف أول مشروع لك ✨</div>';
    return;
  }
  grid.innerHTML = works.map((w,i)=>{
    const bg = w.img
      ? `background-image:linear-gradient(rgba(14,20,32,.25),rgba(14,20,32,.25)),url('${esc(w.img)}')`
      : `background:${covers[i % covers.length]}`;
    const initial = w.img ? '' : esc((w.title||'؟').trim().charAt(0));
    const linkHtml = w.link
      ? `<a class="work-link" href="${esc(w.link)}" target="_blank" rel="noopener">زيارة المشروع ←</a>`
      : `<span class="work-link" style="color:var(--ink-soft)">قيد الإنجاز</span>`;
    return `
    <article class="work">
      <div class="work-thumb" style="${bg}">
        ${w.tag ? `<span class="work-tag">${esc(w.tag)}</span>` : ''}
        ${initial}
      </div>
      <div class="work-body">
        <h3>${esc(w.title)}</h3>
        <p>${esc(w.desc)}</p>
        <div class="work-foot">
          ${linkHtml}
          <div class="work-actions">
            <button type="button" class="icon-btn" data-edit="${i}" aria-label="تعديل ${esc(w.title)}">
              <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </button>
            <button type="button" class="icon-btn del" data-del="${i}" aria-label="حذف ${esc(w.title)}">
              <svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2m1 0v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </article>`;
  }).join('');

  if(worksSection.classList.contains('editing')){
    grid.insertAdjacentHTML('beforeend',
      '<button type="button" class="works-empty" id="addNew" style="cursor:pointer;background:none;color:var(--teal);font-family:inherit;font-size:1rem;font-weight:600">+ إضافة عمل جديد</button>');
  }
}

function openModal(i){
  editIndex = i;
  const w = i >= 0 ? works[i] : {title:'',tag:'',desc:'',link:'',img:''};
  modalTitle.textContent = i >= 0 ? 'تعديل العمل' : 'إضافة عمل جديد';
  fTitle.value = w.title; fTag.value = w.tag; fDesc.value = w.desc;
  fLink.value = w.link; fImg.value = w.img;
  modalBack.classList.add('open');
  fTitle.focus();
}
function closeModal(){ modalBack.classList.remove('open'); }

document.getElementById('toggleEdit').addEventListener('click', e=>{
  const on = worksSection.classList.toggle('editing');
  e.currentTarget.setAttribute('aria-pressed', on);
  e.currentTarget.style.color = on ? 'var(--teal)' : '';
  e.currentTarget.style.borderColor = on ? 'var(--teal)' : '';
  render();
});

grid.addEventListener('click', e=>{
  const editBtn = e.target.closest('[data-edit]');
  const delBtn = e.target.closest('[data-del]');
  if(e.target.closest('#addNew')){ openModal(-1); return; }
  if(editBtn){ openModal(+editBtn.dataset.edit); return; }
  if(delBtn){
    const i = +delBtn.dataset.del;
    if(confirm('هل تريد حذف «' + works[i].title + '»؟')){
      works.splice(i,1); store.save(works); render();
    }
  }
});

document.getElementById('saveWork').addEventListener('click', ()=>{
  const w = {
    title: fTitle.value.trim(),
    tag: fTag.value.trim(),
    desc: fDesc.value.trim(),
    link: fLink.value.trim(),
    img: fImg.value.trim()
  };
  if(!w.title){ fTitle.focus(); fTitle.style.borderColor = '#F87171'; return; }
  if(editIndex >= 0) works[editIndex] = w; else works.push(w);
  store.save(works); closeModal(); render();
});
document.getElementById('cancelModal').addEventListener('click', closeModal);
modalBack.addEventListener('click', e=>{ if(e.target === modalBack) closeModal(); });
document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeModal(); });
fTitle.addEventListener('input', ()=> fTitle.style.borderColor = '');

render();

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));
}
