/* EngControl v1.3.6 — modo professor para testes */
'use strict';
(function(){
  const SPECIAL_AVATAR='PROF_GANDRA';
  const ACCESS_CODE='!G@NDR@!';
  if(!AVATARS.some(a=>a[0]===SPECIAL_AVATAR)) AVATARS.push([SPECIAL_AVATAR,'Professor']);

  const baseAvatarSrc=avatarSrc;
  avatarSrc=function(v){ return v===SPECIAL_AVATAR ? 'assets/avatar-sucesso.png' : baseAvatarSrc(v); };

  function addField(){
    const target=document.getElementById('selectedAvatar');
    if(!target || document.getElementById('professorTestCode')) return;
    const box=document.createElement('div');
    box.className='field';
    box.innerHTML='<label>Código de teste <span class="tiny">(opcional)</span></label><input id="professorTestCode" type="password" autocomplete="off" placeholder="Uso do professor/desenvolvedor"><p class="tiny">Deixe em branco para um cadastro normal.</p>';
    target.parentElement.insertAdjacentElement('afterend',box);
  }

  function configureTeacher(x){
    x.name='Gandra';
    x.avatar=SPECIAL_AVATAR;
    x.role='Desenvolvedor / Professor';
    x.teacherMode=true;
    x.unlocked=Array.from({length:60},(_,i)=>i+1);
    x.availability=100;
    x.reliability=100;
    x.safety=100;
    ensureOperations(x);
    return x;
  }

  const normalCreate=createPlayer;
  createPlayer=function(){
    const code=(document.getElementById('professorTestCode')?.value||'').trim();
    if(!code) return normalCreate();
    if(code!==ACCESS_CODE) return alert('Código de teste não reconhecido.');
    state=configureTeacher(fresh('Gandra',SPECIAL_AVATAR));
    state.id='ENG-TEST-DG';
    save();
    showHome();
    setTimeout(()=>alert('Modo Desenvolvedor / Professor ativado. Todos os níveis foram liberados para teste.'),100);
  };

  const baseMigrate=migrateState;
  migrateState=function(x){
    x=baseMigrate(x);
    if(x && (x.teacherMode || x.avatar===SPECIAL_AVATAR)) configureTeacher(x);
    return x;
  };

  const baseShowHome=showHome;
  showHome=function(){
    if(state && (state.teacherMode || state.avatar===SPECIAL_AVATAR)){ configureTeacher(state); save(); }
    baseShowHome();
    if(state && state.teacherMode){
      const main=document.querySelector('#home main');
      if(main && !document.getElementById('professorModeBanner')){
        const b=document.createElement('div');
        b.id='professorModeBanner';
        b.className='warning-line';
        b.style.marginBottom='14px';
        b.innerHTML='<b>🔧 MODO DESENVOLVEDOR / PROFESSOR</b> — Gandra • 60 níveis liberados para testes.';
        main.insertBefore(b,main.firstChild);
      }
    }
  };

  const basePicker=renderAvatarPicker;
  renderAvatarPicker=function(){
    if(!el.avatarPicker) return;
    el.avatarPicker.innerHTML='';
    AVATARS.filter(a=>a[0]!==SPECIAL_AVATAR).forEach(([file,label])=>{
      const b=document.createElement('button'); b.type='button';
      b.className='avatar-choice'+(el.selectedAvatar.value===file?' selected':'');
      b.innerHTML=`<img src="assets/avatars/${file}" alt="${label}"><small>${label}</small>`;
      b.onclick=()=>selectAvatar(file); el.avatarPicker.appendChild(b);
    });
  };

  addField();
})();
