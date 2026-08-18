(function() {
    const CONFIG = {
        SUPABASE_URL: 'https://wwcmtqqbxdamxebkfsqk.supabase.co',
        SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3Y210cXFieGRhbXhlYmtmc3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MDUzNzksImV4cCI6MjA5MDA4MTM3OX0.4C5gGKxJrpF5BS8FfEAu8FLa9VudEHxCYxwwtb991Io'
    };

    if (!window.supabase) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.async = true;
        document.head.appendChild(script);
    }

    const commonStyles = `
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');

        :host {
            display: block;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: #0f172a;
            --emerald-600: #059669;
            --emerald-500: #10b981;
            --emerald-100: #d1fae5;
            --emerald-50: #ecfdf5;
            --slate-50: #f8fafc;
            --slate-100: #f1f5f9;
            --slate-200: #e2e8f0;
            --slate-400: #94a3b8;
            --slate-600: #475569;
            --slate-800: #1e293b;
            --slate-900: #0f172a;
            --slate-950: #020617;
        }

        * {
            box-sizing: border-box;
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
        }
        *::-webkit-scrollbar {
            display: none !important; /* Chrome, Safari, Opera */
            width: 0 !important;
            height: 0 !important;
        }

        .widget-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .grid {
            display: grid;
            gap: 2.5rem;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        .card {
            background: white;
            border-radius: 50px;
            border: 1px solid var(--slate-100);
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex; flex-direction: column;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            position: relative;
        }

        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .card-image {
            height: 256px;
            position: relative;
            background: var(--slate-200);
            overflow: hidden;
        }

        .card-image img {
            width: 100%; height: 100%; object-fit: cover;
            transition: transform 1s;
        }

        .card:hover .card-image img {
            transform: scale(1.1);
        }

        .badge {
            position: absolute; top: 1.5rem; left: 1.5rem;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
            padding: 0.5rem 1rem; border-radius: 1rem;
            font-size: 10px; font-weight: 900;
            text-transform: uppercase; letter-spacing: 0.1em; color: var(--emerald-600);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .card-content { padding: 2.5rem; flex-grow: 1; display: flex; flex-direction: column; }

        .card-title {
            font-size: 1.5rem; font-weight: 900; color: var(--slate-800);
            margin-bottom: 1.5rem; line-height: 1.2; letter-spacing: -0.025em;
            display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
        }

        .card-stats {
            display: flex; justify-content: space-between; align-items: center;
            padding: 1.5rem 0; margin-bottom: 2.5rem;
            border-top: 1px solid var(--slate-50); border-bottom: 1px solid var(--slate-50);
            font-size: 10px; font-weight: 900; text-transform: uppercase;
            letter-spacing: 0.1em; color: var(--slate-400);
        }

        .stat-item { text-align: center; }
        .stat-val { font-size: 1.5rem; color: var(--emerald-600); display: block; margin-bottom: 0.25rem; font-weight: 900; }
        .stat-val.dark { color: var(--slate-800); }

        .btn {
            width: 100%; padding: 1.25rem; border-radius: 24px;
            font-size: 12px; font-weight: 900; text-transform: uppercase;
            letter-spacing: 0.1em; cursor: pointer; transition: all 0.3s;
            border: none; text-align: center; background: var(--slate-900); color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .btn:hover {
            background: var(--emerald-600);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Modal */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.92);
            backdrop-filter: blur(8px);
            z-index: 999999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            margin: 0;
        }

        .modal-container {
            background: white;
            width: 100%;
            max-width: 1050px;
            max-height: 88vh;
            border-radius: 40px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            position: relative;
            animation: modalIn 0.4s ease-out;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            margin: auto;
        }

        @keyframes modalIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 1024px) { .modal-container { flex-direction: row; } }

        .modal-image-side {
            width: 100%; height: 300px; position: relative;
            flex-shrink: 0;
        }
        @media (min-width: 1024px) { .modal-image-side { width: 45%; height: auto; } }

        .modal-image-side img { width: 100%; height: 100%; object-fit: cover; }

        .modal-image-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%);
            padding: 2.5rem; display: flex; flex-direction: column; justify-content: flex-end;
        }

        .modal-content-side {
            flex-grow: 1; padding: 2rem; overflow-y: auto; background: white; position: relative;
            display: flex; flex-direction: column;
        }
        @media (min-width: 1024px) { .modal-content-side { width: 55%; padding: 3rem; } }

        .close-btn {
            position: absolute; top: 1.5rem; right: 1.5rem;
            width: 42px; height: 42px; border-radius: 50%;
            background: #dbeafe; color: #1e40af; border: none;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .close-btn:hover {
            background: #bfdbfe;
            color: #1e3a8a;
            transform: scale(1.1) rotate(90deg);
        }

        .macro-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;
            width: 100%;
        }
        .macro-card { background: var(--slate-50); padding: 1.25rem 0.5rem; border-radius: 24px; text-align: center; border: 1px solid var(--slate-100); }
        .macro-val { display: block; font-size: 1.5rem; font-weight: 900; color: var(--emerald-600); margin-bottom: 0.25rem; }
        .macro-val.dark { color: var(--slate-800); }
        .macro-lbl { font-size: 8px; font-weight: 900; color: var(--slate-400); text-transform: uppercase; letter-spacing: 0.1em; }

        .section-title {
            font-size: 1rem; font-weight: 900; color: var(--slate-800); text-transform: uppercase;
            letter-spacing: -0.01em; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem;
        }
        .section-num {
            width: 1.75rem; height: 1.75rem; background: var(--emerald-100); color: var(--emerald-600);
            border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 900;
        }

        .ingredients-list {
            padding: 1.25rem; background: white; border-radius: 1rem; color: var(--slate-600);
            font-size: 13px; line-height: 1.6; margin-bottom: 2rem; white-space: pre-wrap;
            border: 1px solid var(--slate-50);
        }

        .bio-datos-grid { display: grid; gap: 0.75rem; margin-bottom: 2rem; }
        .bio-item {
            background: var(--slate-50); padding: 0.75rem 1rem; border-radius: 12px;
            display: flex; justify-content: space-between; align-items: center;
            font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em;
            color: var(--slate-400); border: 1px solid var(--slate-100);
        }
        .bio-val { color: var(--slate-900); font-weight: 900; }
        .bio-val.emerald { color: var(--emerald-600); }

        .instructions-box {
            background: var(--slate-50); padding: 2rem; border-radius: 30px;
            border: 2px dashed var(--slate-200); color: var(--slate-600); font-size: 13px; line-height: 1.6;
            white-space: pre-wrap;
        }

        .loading { padding: 5rem; text-align: center; color: var(--slate-400); font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; }

        @media (max-width: 768px) {
            .widget-container { padding: 20px 15px; }
            .grid { gap: 3.5rem; grid-template-columns: 1fr; }
            .modal-container {
                width: 95%;
                max-height: 85vh;
                border-radius: 30px;
                margin: auto;
                position: relative;
            }
            .modal-image-side { height: 200px; }
            .modal-content-side { padding: 1.5rem; }
            .macro-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
            .modal-image-overlay h2 { font-size: 1.75rem !important; }
            .section-title { font-size: 0.9rem; }
            .card-title { font-size: 1.25rem; }
            .close-btn { top: 1rem; right: 1rem; width: 36px; height: 36px; }
        }
    `;

    function cleanData(data) {
        if (!data) return [];
        if (typeof data === 'string') {
            let trimmed = data.trim();
            if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
                try {
                    const parsed = JSON.parse(trimmed);
                    return cleanData(parsed);
                } catch (e) {
                    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                        trimmed = trimmed.substring(1, trimmed.length - 1);
                    }
                }
            }
            return trimmed.split('\n')
                .map(x => x.trim().replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"'))
                .filter(x => x && x !== 'null');
        }
        if (Array.isArray(data)) {
            return data.flatMap(item => cleanData(item));
        }
        return [String(data)];
    }

    async function getOwnerIdByDomain(supabase, domain) {
        if (!domain) return null;
        const { data } = await supabase.from('wisbe_users').select('id').ilike('domain', domain.trim()).maybeSingle();
        return data ? data.id : null;
    }

    class WisbeGymRecetas extends HTMLElement {
        constructor() { super(); this.attachShadow({ mode: 'open' }); }
        static get observedAttributes() { return ['domain']; }
        attributeChangedCallback() { this.render(); }
        async render() {
            const domain = this.getAttribute('domain');
            this.shadowRoot.innerHTML = `<style>${commonStyles}</style><div class="widget-container"><div class="loading">Sincronizando Nutrición...</div></div>`;
            while (!window.supabase) await new Promise(r => setTimeout(r, 100));
            const supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
            const ownerId = await getOwnerIdByDomain(supabase, domain);
            if (!ownerId) { this.shadowRoot.querySelector('.widget-container').innerHTML = `<div class="loading">Dominio no configurado (${domain})</div>`; return; }

            const { data: recipes } = await supabase.from('gym_recipes').select('*').eq('owner_id', ownerId).order('created_at', { ascending: false });
            if (!recipes || recipes.length === 0) { this.shadowRoot.querySelector('.widget-container').innerHTML = `<div class="loading">Aún no hay recetas disponibles.</div>`; return; }

            const container = this.shadowRoot.querySelector('.widget-container');
            container.innerHTML = '';
            const grid = document.createElement('div'); grid.className = 'grid';
            recipes.forEach(r => {
                const card = document.createElement('div'); card.className = 'card';
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${r.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'}">
                        <div class="badge">${r.category || 'Nutrición'}</div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${r.title}</h3>
                        <div class="card-stats">
                            <div class="stat-item"><span class="stat-val">${r.calories || 0}</span>Kcal</div>
                            <div class="stat-item"><span class="stat-val dark">${r.protein || 0}g</span>Prote</div>
                        </div>
                        <button class="btn">Receta Master</button>
                    </div>
                `;
                card.querySelector('.btn').onclick = () => this.openModal(r);
                grid.appendChild(card);
            });
            container.appendChild(grid);
            if (!this.shadowRoot.getElementById('modal-root')) {
                this.shadowRoot.appendChild(Object.assign(document.createElement('div'), { id: 'modal-root' }));
            }
        }
        openModal(r) {
            let globalPortal = document.getElementById('wisbe-gym-global-portal');
            if (!globalPortal) {
                globalPortal = document.createElement('div');
                globalPortal.id = 'wisbe-gym-global-portal';
                document.body.appendChild(globalPortal);
            }

            globalPortal.innerHTML = `
                <div style="position:fixed; inset:0; width:100vw; height:100vh; background:rgba(15, 23, 42, 0.92); backdrop-filter:blur(8px); z-index:9999999; display:flex; align-items:center; justify-content:center; padding:1rem; box-sizing:border-box; margin:0; font-family:'Inter', system-ui, sans-serif; scrollbar-width:none; -ms-overflow-style:none;" id="wisbe-global-recipe-overlay">
                    <div style="background:white; width:100%; max-width:1050px; max-height:88vh; border-radius:40px; overflow-y:auto; display:flex; flex-direction:row; position:relative; box-shadow:0 25px 50px -12px rgba(0, 0, 0, 0.5); scrollbar-width:none; -ms-overflow-style:none; flex-wrap:wrap;">
                        <button id="wisbe-close-recipe-modal" style="position:absolute; top:1.5rem; right:1.5rem; width:42px; height:42px; border-radius:50%; background:#dbeafe; color:#1e40af; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.3s; z-index:1000; box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div style="min-width:300px; flex:1; position:relative; flex-shrink:0; min-height:280px;">
                            <img src="${r.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'}" style="width:100%; height:100%; object-fit:cover;">
                            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%); padding:2.5rem; display:flex; flex-direction:column; justify-content:flex-end;">
                                <span style="background:#10b981; color:white; padding:0.4rem 1rem; border-radius:2rem; font-size:9px; font-weight:900; text-transform:uppercase; margin-bottom:0.75rem; width:fit-content; letter-spacing:0.15em;">${r.category || 'NUTRICIÓN'}</span>
                                <h2 style="font-size:2.5rem; font-weight:900; color:white; margin:0; line-height:1; letter-spacing:-0.04em;">${r.title}</h2>
                            </div>
                        </div>
                        <div style="flex-grow:1; min-width:320px; flex:1.2; padding:2.5rem; overflow-y:auto; background:white; position:relative; display:flex; flex-direction:column; scrollbar-width:none; -ms-overflow-style:none;">
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(90px, 1fr)); gap:1rem; margin-bottom:2rem; width:100%;">
                                <div style="background:#f8fafc; padding:1.25rem 0.5rem; border-radius:24px; text-align:center; border:1px solid #f1f5f9;"><span style="display:block; font-size:1.5rem; font-weight:900; color:#059669; margin-bottom:0.25rem;">${r.calories || 0}</span><span style="font-size:8px; font-weight:900; color:#94a3b8; text-transform:uppercase; letter-spacing:0.1em;">Kcal</span></div>
                                <div style="background:#f8fafc; padding:1.25rem 0.5rem; border-radius:24px; text-align:center; border:1px solid #f1f5f9;"><span style="display:block; font-size:1.5rem; font-weight:900; color:#1e293b; margin-bottom:0.25rem;">${r.protein || 0}g</span><span style="font-size:8px; font-weight:900; color:#94a3b8; text-transform:uppercase; letter-spacing:0.1em;">Proteínas</span></div>
                                <div style="background:#f8fafc; padding:1.25rem 0.5rem; border-radius:24px; text-align:center; border:1px solid #f1f5f9;"><span style="display:block; font-size:1.5rem; font-weight:900; color:#1e293b; margin-bottom:0.25rem;">${r.carbs || 0}g</span><span style="font-size:8px; font-weight:900; color:#94a3b8; text-transform:uppercase; letter-spacing:0.1em;">Carbs</span></div>
                                <div style="background:#f8fafc; padding:1.25rem 0.5rem; border-radius:24px; text-align:center; border:1px solid #f1f5f9;"><span style="display:block; font-size:1.5rem; font-weight:900; color:#1e293b; margin-bottom:0.25rem;">${r.fats || 0}g</span><span style="font-size:8px; font-weight:900; color:#94a3b8; text-transform:uppercase; letter-spacing:0.1em;">Grasas</span></div>
                            </div>

                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:2rem; margin-bottom:2.5rem;">
                                <div>
                                    <h4 style="font-size:1rem; font-weight:900; color:#1e293b; text-transform:uppercase; letter-spacing:-0.01em; display:flex; align-items:center; gap:0.5rem; margin-bottom:1.25rem;"><div style="width:1.75rem; height:1.75rem; background:#d1fae5; color:#059669; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:900;">01</div> Ingredientes</h4>
                                    <div style="padding:1.25rem; background:white; border-radius:1rem; color:#475569; font-size:13px; line-height:1.6; margin-bottom:2rem; white-space:pre-wrap; border:1px solid #f8fafc;">${cleanData(r.ingredients).join('<br>')}</div>
                                </div>
                                <div>
                                    <h4 style="font-size:1rem; font-weight:900; color:#1e293b; text-transform:uppercase; letter-spacing:-0.01em; display:flex; align-items:center; gap:0.5rem; margin-bottom:1.25rem;"><div style="width:1.75rem; height:1.75rem; background:#d1fae5; color:#059669; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:900;">02</div> Bio-Datos</h4>
                                    <div style="display:grid; gap:0.75rem; margin-bottom:2rem;">
                                        <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center; font-size:9px; font-weight:900; text-transform:uppercase; letter-spacing:0.05em; color:#94a3b8; border:1px solid #f1f5f9;"><span>⏱ Tiempo</span> <span style="color:#0f172a; font-weight:900;">${r.prep_time || '20 min'}</span></div>
                                        <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center; font-size:9px; font-weight:900; text-transform:uppercase; letter-spacing:0.05em; color:#94a3b8; border:1px solid #f1f5f9;"><span>🔪 Dificultad</span> <span style="color:#059669; font-weight:900;">${r.difficulty || 'Media'}</span></div>
                                        <div style="background:#f8fafc; padding:0.75rem 1rem; border-radius:12px; display:flex; justify-content:space-between; align-items:center; font-size:9px; font-weight:900; text-transform:uppercase; letter-spacing:0.05em; color:#94a3b8; border:1px solid #f1f5f9;"><span>🥗 Estilo</span> <span style="color:#0f172a; font-weight:900;">${r.diet_type || 'Equilibrada'}</span></div>
                                    </div>
                                </div>
                            </div>

                            <h4 style="font-size:1rem; font-weight:900; color:#1e293b; text-transform:uppercase; letter-spacing:-0.01em; display:flex; align-items:center; gap:0.5rem; margin-bottom:1.25rem;"><div style="width:1.75rem; height:1.75rem; background:#d1fae5; color:#059669; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:0.7rem; font-weight:900;">03</div> Preparación Master</h4>
                            <div style="background:#f8fafc; padding:2rem; border-radius:30px; border:2px dashed #e2e8f0; color:#475569; font-size:13px; line-height:1.6; white-space:pre-wrap;">${cleanData(r.instructions).join('<br>')}</div>
                        </div>
                    </div>
                </div>
            `;

            const closeBtn = document.getElementById('wisbe-close-recipe-modal');
            const overlay = document.getElementById('wisbe-global-recipe-overlay');

            const closeFn = () => { globalPortal.innerHTML = ''; };
            if (closeBtn) closeBtn.onclick = closeFn;
            if (overlay) overlay.onclick = (e) => { if (e.target === overlay) closeFn(); };
        }
    }

    class WisbeGymRutinas extends HTMLElement {
        constructor() { super(); this.attachShadow({ mode: 'open' }); }
        static get observedAttributes() { return ['domain']; }
        attributeChangedCallback() { this.render(); }
        async render() {
            const domain = this.getAttribute('domain');
            this.shadowRoot.innerHTML = `<style>${commonStyles}</style><div class="widget-container"><div class="loading">Cargando Rutinas...</div></div>`;
            while (!window.supabase) await new Promise(r => setTimeout(r, 100));
            const supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
            const ownerId = await getOwnerIdByDomain(supabase, domain);
            if (!ownerId) return;
            const { data } = await supabase.from('gym_routines').select('*').eq('owner_id', ownerId).order('created_at', { ascending: false });
            if (!data || data.length === 0) { this.shadowRoot.querySelector('.widget-container').innerHTML = `<div class="loading">No hay rutinas publicadas</div>`; return; }

            const container = this.shadowRoot.querySelector('.widget-container');
            container.innerHTML = '';
            const grid = document.createElement('div'); grid.className = 'grid';
            data.forEach(r => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.padding = '2.5rem';
                card.style.cursor = 'pointer';
                card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'; // Subtle shadow, no brilliant glow
                card.innerHTML = `
                    <div style="width:4rem; height:4rem; background:var(--emerald-50); color:var(--emerald-600); border-radius:1.25rem; display:flex; align-items:center; justify-content:center; font-size:1.5rem; margin-bottom:2rem; border:1px solid var(--emerald-100);"><i class="fas fa-dumbbell"></i></div>
                    <h3 class="card-title" style="margin-bottom:0.5rem">${r.title}</h3>
                    <div style="font-size:10px; font-weight:900; color:var(--slate-400); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2rem;">
                        <span style="background:var(--slate-50); padding:0.25rem 0.5rem; border-radius:4px; border:1px solid var(--slate-100); margin-right:1rem">${r.difficulty_level}</span>
                        <span>${r.plan_duration_weeks} Semanas</span>
                    </div>
                    <div class="explorar-btn" style="margin-top:auto; padding-top:1.5rem; border-top:1px solid var(--slate-50); color:var(--emerald-600); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em;">Explorar Plan <i class="fas fa-chevron-right" style="margin-left:0.5rem"></i></div>
                `;
                card.onclick = () => this.openModal(r);
                grid.appendChild(card);
            });
            container.appendChild(grid);
            if (!this.shadowRoot.getElementById('modal-root')) {
                this.shadowRoot.appendChild(Object.assign(document.createElement('div'), { id: 'modal-root' }));
            }
        }

        openModal(r) {
            const root = this.shadowRoot.getElementById('modal-root');
            root.innerHTML = `
                <div class="modal-overlay" id="overlay" style="display:flex">
                    <div class="modal-container">
                        <button class="close-btn" id="close-modal">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <div class="modal-image-side">
                            <img src="${r.image_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'}">
                            <div class="modal-image-overlay">
                                <span style="background:var(--emerald-500); color:white; padding:0.4rem 1rem; border-radius:2rem; font-size:9px; font-weight:900; text-transform:uppercase; margin-bottom:0.75rem; width:fit-content; letter-spacing:0.15em;">${r.difficulty_level || 'INTERMEDIO'}</span>
                                <h2 style="font-size:2.5rem; font-weight:900; color:white; margin:0; line-height:1; letter-spacing:-0.04em;">${r.title}</h2>
                            </div>
                        </div>
                        <div class="modal-content-side">
                            <div class="macro-grid">
                                <div class="macro-card"><span class="macro-val">${r.plan_duration_weeks || 0}</span><span class="macro-lbl">Semanas</span></div>
                                <div class="macro-card"><span class="macro-val dark">${r.difficulty_level || 'N/A'}</span><span class="macro-lbl">Nivel</span></div>
                                <div class="macro-card"><span class="macro-val dark">${r.category || 'Gym'}</span><span class="macro-lbl">Categoría</span></div>
                                <div class="macro-card"><span class="macro-val dark"><i class="fas fa-fire"></i></span><span class="macro-lbl">Intensidad</span></div>
                            </div>

                            <h4 class="section-title"><div class="section-num">01</div> Sobre este Plan</h4>
                            <p style="color:var(--slate-600); font-size:14px; line-height:1.6; margin-bottom:2rem;">${r.description || 'Este plan está diseñado para maximizar tus resultados mediante una progresión estructurada.'}</p>

                            <h4 class="section-title"><div class="section-num">02</div> Estructura del Plan</h4>
                            <div class="instructions-box">${cleanData(r.exercises || r.content || 'Consulte con su entrenador para los detalles específicos de los ejercicios.').join('<br>')}</div>

                            <div style="margin-top: 2rem;">
                                <button class="btn" onclick="window.print()">Descargar PDF del Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            root.querySelector('#close-modal').onclick = () => root.innerHTML = '';
            root.querySelector('#overlay').onclick = (e) => { if(e.target.id === 'overlay') root.innerHTML = ''; };
        }
    }

    class WisbeGymStaff extends HTMLElement {
        constructor() { super(); this.attachShadow({ mode: 'open' }); }
        static get observedAttributes() { return ['domain']; }
        attributeChangedCallback() { this.render(); }
        async render() {
            const domain = this.getAttribute('domain');
            this.shadowRoot.innerHTML = `<style>${commonStyles}</style><div class="widget-container"><div class="loading">Cargando Staff...</div></div>`;
            while (!window.supabase) await new Promise(r => setTimeout(r, 100));
            const supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
            const ownerId = await getOwnerIdByDomain(supabase, domain);
            if (!ownerId) return;
            const { data } = await supabase.from('gym_trainers').select('*').eq('owner_id', ownerId).order('created_at', { ascending: false });
            if (!data || data.length === 0) { this.shadowRoot.querySelector('.widget-container').innerHTML = `<div class="loading">No hay staff registrado</div>`; return; }

            const container = this.shadowRoot.querySelector('.widget-container');
            container.innerHTML = '';
            const grid = document.createElement('div'); grid.className = 'grid';
            data.forEach(t => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.alignItems = 'center';
                card.style.textAlign = 'center';
                card.style.padding = '3rem';
                card.innerHTML = `
                    <div style="width:7rem; height:7rem; border-radius:50%; border:4px solid var(--slate-50); overflow:hidden; margin-bottom:2rem; box-shadow:0 10px 20px rgba(0,0,0,0.05)">
                        <img src="${t.image_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'}" style="width:100%; height:100%; object-fit:cover">
                    </div>
                    <div style="margin-bottom:1.5rem">
                        <span style="background:var(--emerald-50); color:var(--emerald-600); padding:0.25rem 1rem; border-radius:1rem; font-size:10px; font-weight:900; text-transform:uppercase; border:1px solid var(--emerald-100); letter-spacing:0.1em;">${t.specialty}</span>
                        <h3 class="card-title" style="margin-top:1.5rem; margin-bottom:0">${t.full_name}</h3>
                    </div>
                    <p style="color:var(--slate-600); font-size:14px; line-height:1.6; margin-bottom:2.5rem; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden">${t.bio || 'Sin descripción.'}</p>
                    <div style="margin-top:auto; width:100%">
                        <button class="btn btn-conoce-mas" style="cursor:pointer">Conoce más</button>
                    </div>
                `;
                card.querySelector('.btn-conoce-mas').onclick = () => this.openModal(t);
                grid.appendChild(card);
            });
            container.appendChild(grid);
            if (!this.shadowRoot.getElementById('modal-root')) {
                this.shadowRoot.appendChild(Object.assign(document.createElement('div'), { id: 'modal-root' }));
            }
        }

        openModal(t) {
            let extra = { videos: [], routines: [], stats: { exp: '5+', clients: '100+', rating: '99%', stars: '5.0' }, cover_url: '' };
            if (t.contact_info) {
                try {
                    extra = typeof t.contact_info === 'string' ? JSON.parse(t.contact_info) : t.contact_info;
                } catch(e) {
                    console.error("Error parsing contact_info JSON", e);
                }
            }

            const waUrl = t.whatsapp_url ? (t.whatsapp_url.startsWith('http') ? t.whatsapp_url : 'https://wa.me/' + t.whatsapp_url) : '';

            let coverHtml = ``;
            const cover = extra.cover_url || '';
            if (cover) {
                if (cover.includes('.mp4') || cover.includes('.mov') || cover.includes('.quicktime')) {
                    coverHtml = `<video src="${cover}" style="width:100%; height:100%; object-fit:cover" autoplay loop muted playsinline></video>`;
                } else {
                    coverHtml = `<div style="width:100%; height:100%; background-image:url('${cover}'); background-size:cover; background-position:center;"></div>`;
                }
            } else {
                coverHtml = `<div style="width:100%; height:100%; background-image:url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80'); background-size:cover; background-position:center;"></div>`;
            }

            let globalPortal = document.getElementById('wisbe-gym-global-portal');
            if (!globalPortal) {
                globalPortal = document.createElement('div');
                globalPortal.id = 'wisbe-gym-global-portal';
                document.body.appendChild(globalPortal);
            }

            globalPortal.innerHTML = `
                <div style="position:fixed; inset:0; width:100vw; height:100vh; background:rgba(2, 6, 23, 0.85); backdrop-filter:blur(12px); z-index:9999999; display:flex; align-items:center; justify-content:center; padding:1rem; box-sizing:border-box; margin:0; font-family:'Inter', system-ui, sans-serif; scrollbar-width:none; -ms-overflow-style:none;" id="wisbe-global-overlay">
                    <div style="background:#020617; color:#f8fafc; width:100%; max-width:1024px; max-height:92vh; overflow-y:auto; border-radius:32px; border:1px solid #1e293b; box-shadow:0 25px 50px -12px rgba(0, 0, 0, 0.7); position:relative; display:flex; flex-direction:column; scrollbar-width:none; -ms-overflow-style:none;">

                        <!-- Floating Close Button -->
                        <div style="position:absolute; top:1.5rem; right:1.5rem; z-index:130;">
                            <button id="wisbe-close-btn" style="width:48px; height:48px; border-radius:50%; background:rgba(30, 41, 59, 0.8); backdrop-filter:blur(8px); color:white; border:1px solid #334155; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='rgba(30, 41, 59, 0.8)'">
                                <i class="fas fa-times" style="font-size:18px;"></i>
                            </button>
                        </div>

                        <!-- Hero Section / Cover Banner -->
                        <div style="position:relative; min-height:280px; height:320px; width:100%; background:#020617; overflow:hidden; display:flex; align-items:flex-end;">
                            <div style="position:absolute; inset:0;">
                                ${coverHtml}
                            </div>
                            <div style="position:absolute; inset:0; background:linear-gradient(to top, #020617 0%, rgba(2, 6, 23, 0.45) 60%, transparent 100%); z-index:10;"></div>

                            <!-- Trainer Info Overlay -->
                            <div style="position:absolute; bottom:0; left:0; right:0; padding:2rem; display:flex; flex-direction:row; align-items:flex-end; gap:1.5rem; z-index:20; flex-wrap:wrap;">
                                <div style="width:128px; height:128px; border-radius:50%; border:4px solid #3b82f6; overflow:hidden; flex-shrink:0; background:#0f172a; box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);">
                                    <img src="${t.image_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80'}" style="width:100%; height:100%; object-fit:cover;">
                                </div>
                                <div style="flex:1; min-width:240px;">
                                    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem; flex-wrap:wrap;">
                                        <span style="padding:0.35rem 1rem; background:#2563eb; color:white; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; border-radius:9999px; box-shadow:0 10px 15px -3px rgba(37, 99, 235, 0.3);">${t.specialty}</span>
                                        <div style="display:flex; align-items:center; gap:0.25rem; background:#1e293b; border:1px solid #334155; padding:0.25rem 0.75rem; border-radius:9999px; color:#fbbf24; font-size:12px; font-weight:900;">
                                            <i class="fas fa-star"></i>
                                            <span>5.0</span>
                                        </div>
                                    </div>
                                    <h2 style="font-size:2.25rem; font-weight:900; color:white; margin:0; text-transform:uppercase; letter-spacing:-0.025em; line-height:1.1;">${t.full_name}</h2>
                                    <p style="color:#94a3b8; margin-top:0.5rem; font-weight:500; max-width:36rem; font-size:0.875rem; line-height:1.5;">${t.bio || 'Instructor certificado enfocado en potenciar tu nivel y resultados de manera profesional.'}</p>
                                </div>
                                ${waUrl ? `
                                    <div style="display:flex; gap:1rem;">
                                        <a href="${waUrl}" target="_blank" style="text-decoration:none; padding:0.75rem 1.5rem; background:#059669; color:white; font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; border-radius:0.75rem; display:inline-flex; align-items:center; gap:0.5rem; box-shadow:0 10px 15px -3px rgba(5, 150, 105, 0.2); transition:all 0.2s;" onmouseover="this.style.background='#10b981'" onmouseout="this.style.background='#059669'">
                                            <i class="fab fa-whatsapp" style="font-size:18px;"></i> Asesoría Gratis
                                        </a>
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Main Content Body -->
                        <div style="padding:2rem; display:flex; flex-direction:column; gap:2.5rem; background:#020617;">

                            <!-- Stats Grid -->
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
                                <div style="background:#0f172a; border:1px solid rgba(51, 65, 85, 0.8); padding:1.5rem; border-radius:1rem; text-align:center;">
                                    <span style="display:block; font-size:1.875rem; font-weight:900; color:#3b82f6; margin-bottom:0.25rem;">${extra.stats?.exp || '5+'}</span>
                                    <span style="font-size:10px; color:#94a3b8; font-weight:900; text-transform:uppercase; letter-spacing:0.1em;">Años de Exp.</span>
                                </div>
                                <div style="background:#0f172a; border:1px solid rgba(51, 65, 85, 0.8); padding:1.5rem; border-radius:1rem; text-align:center;">
                                    <span style="display:block; font-size:1.875rem; font-weight:900; color:#10b981; margin-bottom:0.25rem;">${extra.stats?.clients || '100+'}</span>
                                    <span style="font-size:10px; color:#94a3b8; font-weight:900; text-transform:uppercase; letter-spacing:0.1em;">Alumnos Activos</span>
                                </div>
                                <div style="background:#0f172a; border:1px solid rgba(51, 65, 85, 0.8); padding:1.5rem; border-radius:1rem; text-align:center;">
                                    <span style="display:block; font-size:1.875rem; font-weight:900; color:#a855f7; margin-bottom:0.25rem;">${extra.videos ? extra.videos.length : '0'}</span>
                                    <span style="font-size:10px; color:#94a3b8; font-weight:900; text-transform:uppercase; letter-spacing:0.1em;">Videos de Técnica</span>
                                </div>
                                <div style="background:#0f172a; border:1px solid rgba(51, 65, 85, 0.8); padding:1.5rem; border-radius:1rem; text-align:center;">
                                    <span style="display:block; font-size:1.875rem; font-weight:900; color:#ec4899; margin-bottom:0.25rem;">${extra.stats?.rating || '99%'}</span>
                                    <span style="font-size:10px; color:#94a3b8; font-weight:900; text-transform:uppercase; letter-spacing:0.1em;">Satisfacción</span>
                                </div>
                            </div>

                            <!-- Layout Grid: Videos & Routines -->
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:2rem;">

                                <!-- Videos Column -->
                                <div style="display:flex; flex-direction:column; gap:1.5rem;">
                                    <div style="border-bottom:1px solid #1e293b; padding-bottom:1rem;">
                                        <h3 style="font-size:1.25rem; font-weight:900; text-transform:uppercase; letter-spacing:-0.025em; color:white; margin:0;">multimedia</h3>
                                    </div>
                                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:1.25rem;">
                                        ${(!extra.videos || extra.videos.length === 0) ? `
                                            <div style="padding:2.5rem; text-align:center; color:#64748b; border:1px dashed #1e293b; border-radius:1rem; width:100%;">
                                                <i class="fas fa-video-slash" style="font-size:1.5rem; margin-bottom:0.5rem; display:block; color:#475569;"></i>
                                                <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">Sin videos publicados</span>
                                            </div>
                                        ` : extra.videos.map(v => `
                                            <div style="background:#0f172a; border:1px solid rgba(51,65,85,0.8); border-radius:1rem; overflow:hidden; display:flex; flex-direction:column;">
                                                <div style="aspect-ratio:16/9; background:#000; position:relative; overflow:hidden;">
                                                    ${(v.url.includes('.mp4') || v.url.includes('.mov')) ? `
                                                        <video src="${v.url}" style="width:100%; height:100%; object-fit:cover;" controls></video>
                                                    ` : (v.url.includes('youtube.com') || v.url.includes('youtu.be')) ? `
                                                        <iframe src="https://www.youtube.com/embed/${v.url.split('v=')[1] || v.url.split('/').pop()}" style="width:100%; height:100%; border:none;"></iframe>
                                                    ` : `
                                                        <img src="${v.url}" style="width:100%; height:100%; object-fit:cover;">
                                                    `}
                                                </div>
                                                <div style="padding:1rem;">
                                                    <h4 style="font-size:13px; font-weight:900; color:white; margin:0; text-transform:uppercase;">${v.title}</h4>
                                                    <p style="font-size:12px; color:#94a3b8; margin:0.35rem 0 0 0; line-height:1.4;">${v.desc || 'Sin descripción'}</p>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <!-- Routines Column -->
                                <div style="display:flex; flex-direction:column; gap:1.5rem;">
                                    <div style="border-bottom:1px solid #1e293b; padding-bottom:1rem;">
                                        <h3 style="font-size:1.25rem; font-weight:900; text-transform:uppercase; letter-spacing:-0.025em; color:white; margin:0;">Rutinas</h3>
                                    </div>
                                    <div style="display:flex; flex-direction:column; gap:1rem;">
                                        ${(!extra.routines || extra.routines.length === 0) ? `
                                            <div style="padding:2.5rem; text-align:center; color:#64748b; border:1px dashed #1e293b; border-radius:1rem;">
                                                <i class="fas fa-dumbbell" style="font-size:1.5rem; margin-bottom:0.5rem; display:block; color:#475569;"></i>
                                                <span style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em;">Sin rutinas publicadas</span>
                                            </div>
                                        ` : extra.routines.map(r => `
                                            <div style="background:#0f172a; border:1px solid #1e293b; padding:1.25rem; border-radius:1rem;">
                                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                                                    <span style="padding:0.2rem 0.6rem; background:rgba(16, 185, 129, 0.1); color:#34d399; border:1px solid rgba(16, 185, 129, 0.2); font-size:9px; font-weight:900; text-transform:uppercase; border-radius:9999px;">${r.difficulty || 'INTERMEDIO'}</span>
                                                    <span style="font-size:10px; color:#94a3b8; font-weight:700;"><i class="far fa-clock" style="margin-right:0.25rem;"></i> ${r.duration || '4 Semanas'}</span>
                                                </div>
                                                <h4 style="font-size:14px; font-weight:900; color:white; margin:0 0 0.25rem 0; text-transform:uppercase;">${r.title}</h4>
                                                <p style="font-size:12px; color:#94a3b8; margin:0; line-height:1.4;">${r.desc || 'Plan estructurado.'}</p>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            `;

            const closeBtn = document.getElementById('wisbe-close-btn');
            const overlay = document.getElementById('wisbe-global-overlay');

            const closeFn = () => { globalPortal.innerHTML = ''; };
            if (closeBtn) closeBtn.onclick = closeFn;
            if (overlay) overlay.onclick = (e) => { if (e.target === overlay) closeFn(); };
        }
    }

    customElements.define('wisbe-gym-recetas', WisbeGymRecetas);
    customElements.define('wisbe-gym-rutinas', WisbeGymRutinas);
    customElements.define('wisbe-gym-staff', WisbeGymStaff);
})();
