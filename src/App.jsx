
import React, { useState, useEffect } from 'react'

function Header(){
  const [open, setOpen] = useState(false)

  // Fecha o menu quando voltar para desktop
  useEffect(()=>{
    const onResize = () => { if (window.innerWidth > 900) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  },[])

  // Bloqueia/desbloqueia o scroll do body quando o menu abre
  useEffect(()=>{
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  },[open])

  // Fecha o menu com a tecla ESC
  useEffect(()=>{
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  },[])

  return (
    <header className="header">
      <div className="container">
        <div className="logo">Vital<span>Conta</span></div>

        <button
          className="hamburger"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="nav-primary"
          onClick={()=>setOpen(!open)}
        >
          <span className="bar"></span>
        </button>

        <nav id="nav-primary" className={`nav ${open ? 'open' : ''}`}>
          <a onClick={()=>setOpen(false)} href="#servicos">Serviços</a>
          <a onClick={()=>setOpen(false)} href="#metodo">Método</a>
          <a onClick={()=>setOpen(false)} href="#sobre">Sobre</a>
          <a onClick={()=>setOpen(false)} href="#contato" className="btn btn-primary">Fale Conosco</a>
        </nav>

        {/* Overlay para fechar ao clicar fora */}
        <div
          className="nav-overlay"
          style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
          onClick={()=>setOpen(false)}
          aria-hidden="true"
        />
      </div>
    </header>
  )
}

function Hero(){
  return (
    <section className="hero">
      <div className="container grid-2">
        <div>
          <h1>Gestão estratégica que impulsiona seu negócio</h1>
          <p>Estruturamos processos, finanças e operações para aumentar eficiência e resultados. Simples, claro e focado no que importa: crescimento.</p>
          <div className="cta-group">
            <a href="#contato" className="btn btn-primary">Agendar conversa</a>
            <a href="#servicos" className="btn btn-outline">Ver serviços</a>
          </div>
          <ul className="bullets">
            <li>✓ SEO técnico pronto</li>
            <li>✓ Carregamento rápido</li>
            <li>✓ Formulário + WhatsApp</li>
          </ul>
        </div>
        <div className="hero-card">
          <div className="stat"><strong>+30%</strong><span>produtividade média</span></div>
          <div className="stat"><strong>15 dias</strong><span>média para primeiros ganhos</span></div>
          <div className="stat"><strong>100%</strong><span>responsivo</span></div>
        </div>
      </div>
    </section>
  )
}

function Servicos(){
  const items = [
    {title:'Gestão Estratégica', desc:'Diagnóstico, plano de ação e acompanhamento executivo.'},
    {title:'BPO Financeiro', desc:'Fluxo de caixa, contas a pagar/receber e relatórios.'},
    {title:'Faturamento Hospitalar', desc:'Operação, conferência e eficiência nos ciclos de faturamento.'},
    {title:'Certificado Digital', desc:'Emissão e renovação com suporte.'},
    {title:'Abertura e Mudanças de Empresa', desc:'Do planejamento à execução documental.'},
    {title:'Emissão de Nota Fiscal', desc:'Implantação e orientação de uso.'},
  ]
  return (
    <section id="servicos" className="section">
      <div className="container">
        <h2>Nossos Serviços</h2>
        <div className="cards">
          {items.map((s,i)=> (
            <div className="card" key={i}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#contato" className="link">Saiba mais →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Metodo(){
  const steps = [
    {n:1, t:'Diagnóstico', d:'Entendemos contexto, metas e gargalos.'},
    {n:2, t:'Plano', d:'Roadmap priorizado com metas e prazos.'},
    {n:3, t:'Execução', d:'Implementação guiada e acompanhamento.'},
    {n:4, t:'Resultados', d:'Métricas, ajustes e próximos passos.'},
  ]
  return (
    <section id="metodo" className="section alt">
      <div className="container">
        <h2>Nosso Método</h2>
        <div className="steps">
          {steps.map(s => (
            <div className="step" key={s.n}>
              <div className="badge">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Sobre(){
  return (
    <section id="sobre" className="section">
      <div className="container grid-2">
        <div>
          <h2>Sobre a Vital Conta</h2>
          <p>Somos uma empresa focada em gestão estratégica. Atuamos lado a lado com negócios que precisam de estrutura, clareza de indicadores e execução disciplinada.</p>
          <p>Trabalhamos com processos simples, comunicação direta e foco em impacto.</p>
        </div>
        <div className="about-box">
          <ul>
            <li>Experiência multidisciplinar</li>
            <li>Metodologia própria</li>
            <li>Atuação consultiva e prática</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contato(){
  const onSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const subject = encodeURIComponent(`Contato — ${data.nome || ''}`)
    const body = encodeURIComponent(
      `Nome: ${data.nome || ''}\n`+
      `Email: ${data.email || ''}\n`+
      `Telefone: ${data.telefone || ''}\n`+
      `Assunto: ${data.assunto || ''}\n`+
      `Mensagem:\n${data.mensagem || ''}`
    )
    window.location.href = `mailto:professorhnsilva@gmail.com?subject=${subject}&body=${body}`
  }
  return (
    <section id="contato" className="section alt">
      <div className="container">
        <h2>Fale com um especialista</h2>
        <p style={{margin:'8px 0 18px', fontWeight:600}}>Telefone: <a href="tel:+5561984471094">(61) 98447-1094</a> · E-mail: <a href="mailto:professorhnsilva@gmail.com">professorhnsilva@gmail.com</a></p>
        <form className="form" onSubmit={onSubmit}>
          <div className="grid-2">
            <label>Nome<input name="nome" required placeholder="Seu nome"/></label>
            <label>Email<input name="email" type="email" required placeholder=""/></label>
          </div>
          <div className="grid-2">
            <label>Telefone<input name="telefone" placeholder=""/></label>
            <label>Assunto<input name="assunto" placeholder="Como podemos ajudar?"/></label>
          </div>
          <label>Mensagem<textarea name="mensagem" rows="5" placeholder="Conte um pouco sobre sua necessidade"></textarea></label>
          <div className="cta-group">
            <button className="btn btn-primary" type="submit">Enviar</button>
            <a className="btn btn-outline" href="https://wa.me/5561984471094" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Vital Conta — Consultoria e Gestão Estratégica</p>
        <p><a href="#">Política de Privacidade</a></p>
      </div>
    </footer>
  )
}

export default function App(){
  return (
    <>
      <Header />
      <Hero />
      <Servicos />
      <Metodo />
      <Sobre />
      <Contato />
      <Footer />
    </>
  )
}
