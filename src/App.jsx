import { useState, useEffect, useRef } from "react";

const COMPETITIONS = [
  { id: 1, name: "Nestle Genesis Leaders League", company: "Nestle", category: "Marketing", period: "Jun-Jul", month: 6, regWindow: "Jun", teamSize: "3", format: "Case submission → Campus → Nationals", unstopUrl: "https://unstop.com/competitions?q=nestle+genesis", desc: "FMCG marketing challenge focused on Nestle brands and go-to-market strategy." },
  { id: 2, name: "Godrej LOUD", company: "Godrej", category: "Leadership", period: "Jun-Jul", month: 6, regWindow: "Jun-Jul", teamSize: "Individual", format: "Essay → Video → Campus → Nationals", unstopUrl: "https://unstop.com/competitions?q=godrej+loud", desc: "Individual leadership essay + video challenge. Focus on personal story and impact." },
  { id: 3, name: "L'Oreal Brandstorm 2026", company: "L'Oreal", category: "Marketing", period: "Jun-Jul", month: 6, regWindow: "Nov-Mar (for next year cycle)", teamSize: "3", format: "Slides + Video → Local Selection → Paris Finals", unstopUrl: "https://brandstorm.loreal.com/en", desc: "Global innovation competition. 2026 theme: luxury fragrance. Open to under-30s. Winning team goes to Paris for Viva Technology." },
  { id: 4, name: "P&G PEAKathon", company: "P&G", category: "Leadership", period: "Jun-Jul", month: 6, regWindow: "Jun", teamSize: "Individual", format: "Online assessment → Leadership challenge", unstopUrl: "https://unstop.com/competitions?q=P%26G+PEAKathon", desc: "Individual leadership and business acumen challenge by P&G." },
  { id: 5, name: "Airtel iCreate", company: "Airtel", category: "Product", period: "Jun-Jul", month: 6, regWindow: "Jun-Jul", teamSize: "2-3", format: "Idea submission → Prototype → Pitch", unstopUrl: "https://unstop.com/competitions?q=airtel+icreate", desc: "Product/tech innovation challenge for Airtel's digital ecosystem." },
  { id: 6, name: "ITC Interrobang", company: "ITC", category: "Strategy", period: "Jun-Jul", month: 6, regWindow: "Jul (Reg ~20 Jul, Case ~2 Aug, Submit ~16 Aug)", teamSize: "3-4", format: "Case submission → Campus presentation → National Round", unstopUrl: "https://unstop.com/competitions?q=itc+interrobang", desc: "ITC's flagship. Real business cases across Marketing, HR & SCM. Campus winners present to ITC leadership. PPIs for winners. Prizes ₹50L+ across campuses." },
  { id: 7, name: "Colgate Inner Circle", company: "Colgate", category: "Marketing", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug", teamSize: "3", format: "Case submission → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=colgate+inner+circle", desc: "Marketing case on Colgate's oral care portfolio." },
  { id: 8, name: "HUL L.I.M.E.", company: "HUL", category: "Marketing", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug (Submit by ~Aug 19)", teamSize: "3", format: "3-slide submission → Semi-finale → Grand Finale (CNBC-TV18)", unstopUrl: "https://unstop.com/competitions?q=hul+lime", desc: "India's largest B-school marketing challenge. Televised on CNBC-TV18. Semi-finalists get PPIs for ULIP internship. Prize: ₹10L. Winners go to Unilever global comp." },
  { id: 9, name: "HUL FINACE", company: "HUL", category: "Finance", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug", teamSize: "3", format: "Case submission → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=hul+finace", desc: "Finance-focused challenge. Working capital, P&L optimization for FMCG." },
  { id: 10, name: "HUL TechTonic", company: "HUL", category: "Product", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug", teamSize: "3", format: "Case submission → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=hul+techtonic", desc: "Tech and digital transformation in FMCG supply chain and operations." },
  { id: 11, name: "Asian Paints CANVAS", company: "Asian Paints", category: "Marketing", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug", teamSize: "2-3", format: "Case submission → Campus → Nationals", unstopUrl: "https://unstop.com/competitions?q=asian+paints+canvas", desc: "Brand positioning and campaign planning for Asian Paints." },
  { id: 12, name: "Amazon ACE Challenge", company: "Amazon", category: "Product", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug (Quiz → Doc → Sep finals)", teamSize: "3-4", format: "Quiz → Document submission → Campus → National Finale", unstopUrl: "https://unstop.com/competitions?q=amazon+ace+challenge", desc: "Ranked #1 B-school competition. Document-based (unique!). Top 3/campus get PPIs. ₹2L national winners." },
  { id: 13, name: "Accenture B-School Strategy Challenge", company: "Accenture", category: "Strategy", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug", teamSize: "3-4", format: "Gamified rounds → Case study → Grand Finale (Top 8)", unstopUrl: "https://unstop.com/competitions?q=accenture+b-school+strategy", desc: "Consulting/strategy gamified challenge. Top 8 get Accenture mentor. PPIs available." },
  { id: 14, name: "Flipkart Wired Campus Case Challenge", company: "Flipkart", category: "Product", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug (Reg by ~Aug 15)", teamSize: "3", format: "Pick track → 5-slide PPT → Campus → Nationals at Flipkart Bengaluru", unstopUrl: "https://unstop.com/competitions?q=flipkart+wired", desc: "4 tracks: Business, Product, Supply Chain, HR. PPIs during campus round. ₹2L for national winners. SPJIMR participates." },
  { id: 15, name: "Dabur VERVE", company: "Dabur", category: "Marketing", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug", teamSize: "2-3", format: "Case submission → Presentation", unstopUrl: "https://unstop.com/competitions?q=dabur+verve", desc: "FMCG marketing — Ayurvedic/natural products positioning." },
  { id: 16, name: "Samsung EDGE", company: "Samsung", category: "Leadership", period: "Jul-Aug", month: 7, regWindow: "Jul-Aug", teamSize: "3", format: "Quiz → Case → Presentation → Nationals", unstopUrl: "https://unstop.com/competitions?q=samsung+edge", desc: "Multi-domain: strategy, marketing, tech innovation for Samsung." },
  { id: 17, name: "BlinkX Brain-A-Thon", company: "BlinkX", category: "Product", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "2-3", format: "Case submission → Finals", unstopUrl: "https://unstop.com/competitions?q=blinkx", desc: "Fintech product challenge for stock broking platforms." },
  { id: 18, name: "Reckitt Career Compass", company: "Reckitt", category: "Marketing", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "3", format: "Quiz → Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=reckitt+career+compass", desc: "FMCG fundamentals. Fast-track to Sales & Marketing internship at Reckitt." },
  { id: 19, name: "AdXiaomi 2.0", company: "Xiaomi India", category: "Marketing", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "2-3", format: "Ad campaign submission", unstopUrl: "https://unstop.com/competitions?q=adxiaomi", desc: "Marketing/ad campaign for Xiaomi products." },
  { id: 20, name: "Xiaomi Summit 6.0", company: "Xiaomi", category: "General", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "3", format: "Case → Presentation → Summit", unstopUrl: "https://unstop.com/competitions?q=xiaomi+summit", desc: "Multi-domain business challenge." },
  { id: 21, name: "TVS Credit e.p.i.c.", company: "TVS Credit", category: "Finance", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "2-3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=tvs+credit+epic", desc: "NBFC finance. Credit risk, lending strategy, financial inclusion." },
  { id: 22, name: "Bajaj Finserv ATOM", company: "Bajaj Finserv", category: "Finance", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "2-3", format: "Case submission → Finals", unstopUrl: "https://unstop.com/competitions?q=bajaj+finserv+atom", desc: "Insurance, lending, fintech innovation strategy." },
  { id: 23, name: "Tata Imagination Challenge", company: "Tata", category: "Product", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "3", format: "Case → Presentation → National finals", unstopUrl: "https://unstop.com/competitions?q=tata+imagination+challenge", desc: "TAS flagship. Multi-domain across Tata group. PPO opportunity." },
  { id: 24, name: "Reliance T.U.P", company: "Reliance", category: "Leadership", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "2-3", format: "Assessment → Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=reliance+tup", desc: "Leadership challenge across Reliance business verticals." },
  { id: 25, name: "GE Healthcare Think Aloud", company: "GE Healthcare", category: "General", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=ge+healthcare", desc: "Healthcare strategy and innovation." },
  { id: 26, name: "Rebel Foods EatSure Cloud", company: "Rebel Foods", category: "Product", period: "Aug-Sep", month: 8, regWindow: "Aug-Sep", teamSize: "2-3", format: "Case → Pitch", unstopUrl: "https://unstop.com/competitions?q=rebel+foods", desc: "Cloud kitchen business model and food-tech product strategy." },
  { id: 27, name: "American Express Campus Challenge", company: "American Express", category: "Finance", period: "Sep-Oct", month: 9, regWindow: "Sep (Crossword → Problem → Deck)", teamSize: "2-4", format: "Crossword → Analytics problem → Deck + Presentation", unstopUrl: "https://unstop.com/competitions?q=american+express+campus+challenge", desc: "Analytics & data science competition. Predictive modeling. PPIs for top performers. Perfect for IM&A." },
  { id: 28, name: "Quest EY – EY Parthenon", company: "EY-Parthenon", category: "Strategy", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "3", format: "Case → Presentation → Finale", unstopUrl: "https://unstop.com/competitions?q=ey+parthenon+quest", desc: "Strategy consulting case. Due diligence, market entry, growth strategy." },
  { id: 29, name: "Accenture Innovation Challenge", company: "Accenture", category: "Strategy", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "3-4", format: "Idea → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=accenture+innovation+challenge", desc: "Innovation & digital transformation. Different from B-School Strategy Challenge." },
  { id: 30, name: "J&J Crackathon", company: "Johnson & Johnson", category: "General", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=j%26j+crackathon", desc: "Healthcare/consumer goods multi-domain case." },
  { id: 31, name: "Mahindra RISE Challenge", company: "Mahindra", category: "Strategy", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "3-4", format: "Case → Campus → National finale", unstopUrl: "https://risechallenge.mahindra.com/", desc: "Formerly War Room. Industry disruption strategy. PPIs for winners. One of the most respected." },
  { id: 32, name: "AB InBev 100+ Challenge", company: "AB InBev", category: "General", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=ab+inbev+100", desc: "Supply chain, marketing, or strategy for world's largest brewer." },
  { id: 33, name: "Flipkart Vidyarthini", company: "Flipkart", category: "General", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "3 (women only)", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=flipkart+vidyarthini", desc: "Women-only competition by Flipkart. Business/product case. Excellent fit." },
  { id: 34, name: "Finshots Idea Lab", company: "Finshots", category: "Finance", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "2-3", format: "Ideation → Submission", unstopUrl: "https://unstop.com/competitions?q=finshots+idea+lab", desc: "Finance/fintech ideation by popular finance media brand." },
  { id: 35, name: "Kenvue Future Leader Program", company: "Kenvue", category: "Leadership", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "Individual", format: "Application → Assessment → Interview", unstopUrl: "https://unstop.com/competitions?q=kenvue", desc: "Leadership pipeline by J&J's consumer health spinoff." },
  { id: 36, name: "PwC Campus Contender", company: "PwC", category: "Strategy", period: "Sep-Oct", month: 9, regWindow: "Sep-Oct", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=pwc+campus+contender", desc: "Strategy consulting case by PwC India." },
  { id: 37, name: "L'Oreal Sustainability Challenge", company: "L'Oreal", category: "Marketing", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "3", format: "Submission → Presentation", unstopUrl: "https://unstop.com/competitions?q=loreal+sustainability", desc: "Sustainability-focused marketing and innovation." },
  { id: 38, name: "Mondelez Maestros", company: "Mondelez", category: "Marketing", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=mondelez+maestros", desc: "FMCG marketing for Cadbury/Oreo. Consumer insights driven." },
  { id: 39, name: "Asian Paints Chain Reaction", company: "Asian Paints", category: "Marketing", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "2-3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=asian+paints+chain+reaction", desc: "Supply chain + marketing intersection." },
  { id: 40, name: "Asian Paints Cognoscenti", company: "Asian Paints", category: "Marketing", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "2-3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=asian+paints+cognoscenti", desc: "Marketing strategy and brand management." },
  { id: 41, name: "IDFC First Bank FAME", company: "IDFC First Bank", category: "Finance", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "2-3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=idfc+first+bank+fame", desc: "Retail banking, digital payments strategy." },
  { id: 42, name: "Avalon Consulting Sun Tzu", company: "Avalon Consulting", category: "Strategy", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=avalon+sun+tzu", desc: "Pure strategy consulting case. Competitive strategy focus." },
  { id: 43, name: "ServiceNow Innovation Challenge", company: "ServiceNow", category: "Product", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "3", format: "Idea → Prototype → Pitch", unstopUrl: "https://unstop.com/competitions?q=servicenow+innovation", desc: "Enterprise SaaS product innovation. Workflow automation and AI." },
  { id: 44, name: "Paytm Innovation Challenge", company: "Paytm", category: "Product", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "2-3", format: "Idea → Pitch", unstopUrl: "https://unstop.com/competitions?q=paytm+innovation", desc: "Fintech product innovation. Payments, lending, commerce." },
  { id: 45, name: "V-Guard Big Idea", company: "V-Guard", category: "Strategy", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=v-guard+big+idea", desc: "Consumer durables business strategy." },
  { id: 46, name: "GSK E-Cube", company: "GSK", category: "General", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=gsk+ecube", desc: "Healthcare/pharma multi-domain challenge." },
  { id: 47, name: "IND Ideathon", company: "Indian Bank", category: "Finance", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "2-3", format: "Ideation → Submission", unstopUrl: "https://unstop.com/competitions?q=indian+bank+ideathon", desc: "Banking innovation and financial inclusion." },
  { id: 48, name: "Muthoot Finclusion Challenge", company: "Muthoot Group", category: "Finance", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "2-3", format: "Case → Finals", unstopUrl: "https://unstop.com/competitions?q=muthoot+finclusion", desc: "Financial inclusion and gold loan industry strategy." },
  { id: 49, name: "Meesho DICE Challenge", company: "Meesho", category: "Product", period: "Oct-Nov", month: 10, regWindow: "Oct-Nov", teamSize: "2-3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=meesho+dice", desc: "E-commerce product/platform. Social commerce strategy." },
  { id: 50, name: "Capgemini L'Innovateur 8.0", company: "Capgemini", category: "Strategy", period: "Nov-Dec", month: 11, regWindow: "Oct-Nov", teamSize: "3", format: "Case → Campus → National finale", unstopUrl: "https://unstop.com/competitions?q=capgemini+innovateur", desc: "ELITE program flagship. Business + tech cases. PPIs for E.L.I.T.E. General Management Program." },
  { id: 51, name: "PwC Whitepaper 4.0", company: "PwC", category: "Strategy", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "3", format: "Whitepaper → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=pwc+whitepaper", desc: "Write a consulting whitepaper. Unique format — tests written analysis." },
  { id: 52, name: "HDFC Life Aspire", company: "HDFC Life", category: "Finance", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "2-3", format: "Case → Finals", unstopUrl: "https://unstop.com/competitions?q=hdfc+life+aspire", desc: "Insurance and financial planning strategy." },
  { id: 53, name: "Avendus Banking on Her", company: "Avendus", category: "Finance", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "3 (women only)", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=avendus+banking+on+her", desc: "Women-only finance comp by top investment bank. M&A cases." },
  { id: 54, name: "Jio Creative Labs", company: "Jio", category: "Marketing", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "2-3", format: "Creative submission → Presentation", unstopUrl: "https://unstop.com/competitions?q=jio+creative+labs", desc: "Digital marketing and creative strategy for Jio." },
  { id: 55, name: "Tata Consumer – Grow Beyond Better", company: "Tata Consumer", category: "Marketing", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=tata+consumer", desc: "FMCG marketing for Tata Tea, Tata Salt, Starbucks India." },
  { id: 56, name: "Galderma GRAD", company: "Galderma", category: "General", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "3", format: "Case → Finals", unstopUrl: "https://unstop.com/competitions?q=galderma+grad", desc: "Dermatology/skincare business strategy. Niche, low competition." },
  { id: 57, name: "ReNew Re-lead 7.0", company: "ReNew", category: "Leadership", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=renew+relead", desc: "Renewable energy business strategy and leadership." },
  { id: 58, name: "Castrol Power Up", company: "Castrol", category: "Strategy", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=castrol+power+up", desc: "Automotive lubricants strategy. B2B + B2C." },
  { id: 59, name: "Asian Paints The Conundrum", company: "Asian Paints", category: "Marketing", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "2-3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=asian+paints+conundrum", desc: "Complex marketing case with multiple constraints." },
  { id: 60, name: "HeadstaRt", company: "HeadstaRt", category: "Leadership", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "Varies", format: "Multi-round", unstopUrl: "https://unstop.com/competitions?q=headstart", desc: "Entrepreneurship and startup-focused." },
  { id: 61, name: "Colgate Transcend", company: "Colgate", category: "Leadership", period: "Nov-Dec", month: 11, regWindow: "Nov-Dec", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=colgate+transcend", desc: "Leadership and business transformation at Colgate." },
  { id: 62, name: "Pidilite Bond with Pidilite", company: "Pidilite", category: "Product", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=pidilite+bond", desc: "Product and business strategy for Fevicol, M-Seal." },
  { id: 63, name: "Destination Dr. Reddy's", company: "Dr. Reddy's", category: "General", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=dr+reddys+destination", desc: "Pharma industry business strategy." },
  { id: 64, name: "Over The Wall Season 12", company: "Over The Wall", category: "General", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3-4", format: "Multi-round case", unstopUrl: "https://unstop.com/competitions?q=over+the+wall", desc: "Multi-domain case competition." },
  { id: 65, name: "REDEFINE", company: "REDEFINE", category: "Leadership", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "Varies", format: "Multi-round", unstopUrl: "https://unstop.com/competitions?q=redefine", desc: "Leadership and vision challenge." },
  { id: 66, name: "Infosys Ingenious", company: "Infosys", category: "Strategy", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=infosys+ingenious", desc: "Digital transformation and IT strategy consulting." },
  { id: 67, name: "Unstop Talent Park", company: "Unstop", category: "General", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "Varies", format: "Multi-format", unstopUrl: "https://unstop.com/competitions?q=talent+park", desc: "Platform-wide multi-track competition." },
  { id: 68, name: "HP Power Lab", company: "HPCL", category: "General", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=hpcl+power+lab", desc: "Energy sector business strategy." },
  { id: 69, name: "JSW Challenge", company: "JSW", category: "Strategy", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3", format: "Case → Presentation → JSW campus visit", unstopUrl: "https://unstop.com/competitions?q=jsw+challenge", desc: "Steel/infra/energy conglomerate. PPO opportunity. Mentorship from JSW leaders." },
  { id: 70, name: "L&T OutThink", company: "L&T", category: "Strategy", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=l%26t+outthink", desc: "Infrastructure and engineering conglomerate strategy." },
  { id: 71, name: "Steel-a-Thon", company: "Tata Steel", category: "General", period: "Dec-Jan", month: 12, regWindow: "Dec-Jan", teamSize: "3", format: "Case → Presentation → Jamshedpur finals", unstopUrl: "https://unstop.com/competitions?q=tata+steel+steelathon", desc: "Multi-domain (Ops, Marketing, Finance, HR) by Tata Steel." },
  { id: 72, name: "ITC Emerging Women Managers Awards", company: "ITC", category: "Leadership", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "Individual (women)", format: "Application → Interview → Award", unstopUrl: "https://unstop.com/competitions?q=itc+emerging+women+managers", desc: "Individual women leadership award by ITC. Essay + interview. MUST APPLY." },
  { id: 73, name: "IndiGo Aspiring Leaders Program", company: "IndiGo", category: "Leadership", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "Individual", format: "Application → Assessment → Interview", unstopUrl: "https://unstop.com/competitions?q=indigo+aspiring+leaders", desc: "Aviation industry leadership pipeline." },
  { id: 74, name: "PepsiCo – Learn Today Give Tomorrow", company: "PepsiCo", category: "Marketing", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=pepsico+learn+today", desc: "FMCG marketing strategy for PepsiCo brands." },
  { id: 75, name: "Nation Building Contest", company: "Nation Building", category: "General", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "Varies", format: "Ideation → Submission", unstopUrl: "https://unstop.com/competitions?q=nation+building+contest", desc: "Social impact and nation-building ideathon." },
  { id: 76, name: "Hero Campus Challenge", company: "Hero", category: "General", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "3", format: "Case → Campus → Nationals", unstopUrl: "https://unstop.com/competitions?q=hero+campus+challenge", desc: "Multi-domain by Hero MotoCorp. SPJIMR participates. ₹2.5L winners." },
  { id: 77, name: "The Governance Challenge", company: "TGC", category: "Strategy", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "3", format: "Policy case → Presentation", unstopUrl: "https://unstop.com/competitions?q=governance+challenge", desc: "Public policy and governance strategy." },
  { id: 78, name: "UltraQuest Season 2", company: "UltraQuest", category: "General", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "Varies", format: "Multi-round", unstopUrl: "https://unstop.com/competitions?q=ultraquest", desc: "General business challenge." },
  { id: 79, name: "Trendsetter", company: "Trendsetter", category: "Marketing", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "2-3", format: "Submission → Presentation", unstopUrl: "https://unstop.com/competitions?q=trendsetter", desc: "Marketing trends and creative campaigns." },
  { id: 80, name: "VOLT Season 1", company: "VOLT", category: "Product", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "2-3", format: "Submission → Presentation", unstopUrl: "https://unstop.com/competitions?q=volt+season", desc: "Product and innovation challenge." },
  { id: 81, name: "AcuWar by Acuyon", company: "Acuyon", category: "Strategy", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=acuwar+acuyon", desc: "Strategy consulting simulation." },
  { id: 82, name: "thouCentric Bottoms Up 3.0", company: "thouCentric", category: "Strategy", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=thoucentric+bottoms+up", desc: "Management consulting strategy case." },
  { id: 83, name: "Ascend Season 3", company: "Ascend", category: "Leadership", period: "Jan-Feb", month: 1, regWindow: "Jan-Feb", teamSize: "Varies", format: "Multi-round", unstopUrl: "https://unstop.com/competitions?q=ascend+season", desc: "Leadership development challenge." },
  { id: 84, name: "Sa Re Ga Ma Talentwood", company: "Sa Re Ga Ma", category: "General", period: "Feb-Mar", month: 2, regWindow: "Feb-Mar", teamSize: "Varies", format: "Multi-round", unstopUrl: "https://unstop.com/competitions?q=saregama+talentwood", desc: "Music/entertainment industry business." },
  { id: 85, name: "Perfetti Van Melle Confy Challenge", company: "Perfetti Van Melle", category: "Marketing", period: "Feb-Mar", month: 2, regWindow: "Feb-Mar", teamSize: "2-3", format: "Case → Presentation", unstopUrl: "https://unstop.com/competitions?q=perfetti+van+melle", desc: "FMCG confectionery marketing strategy." },
  { id: 86, name: "Stratos – Business Simulation", company: "Aditya Birla Group", category: "Strategy", period: "Feb-Mar", month: 2, regWindow: "Feb-Mar", teamSize: "3", format: "Online simulation → National finals", unstopUrl: "https://unstop.com/competitions?q=stratos+business+simulation", desc: "ABG's flagship simulation. Strategy + marketing + finance + ops. SPJIMR participates. PPIs." },
  { id: 87, name: "VOIS Vantage", company: "VOIS/Vodafone", category: "Leadership", period: "Feb-Mar", month: 2, regWindow: "Feb-Mar", teamSize: "3", format: "Case → Presentation → Finals", unstopUrl: "https://unstop.com/competitions?q=vois+vantage", desc: "Telecom strategy and digital transformation leadership." },
];

const PRE_STRATEGIES = {
  6: { priority: "high", status: "not_started", notes: "YOUR #1 PICK. ITC's flagship — most prestigious comp in your first month. Your Accenture strategy background is a direct edge. Pick Marketing or SCM track. Use STP, 4Ps, Porter's Five Forces.\n\nSpend 60% time on research, 30% slides, 10% polish. ITC judges love data-backed insights — use your quant skills for financial projections.\n\nTip: Read ITC Annual Report cover-to-cover before case drops.", teammates: "", resources: [
    { name: "ITC Annual Reports", url: "https://www.itcportal.com/about-itc/shareholder-value/annual-reports.aspx", id: 1 },
    { name: "Past winners on LinkedIn", url: "https://www.linkedin.com/search/results/content/?keywords=itc%20interrobang%20winner", id: 2 },
    { name: "Case frameworks guide", url: "https://www.hackingthecaseinterview.com/pages/case-competitions", id: 3 },
  ]},
  8: { priority: "high", status: "not_started", notes: "India's BIGGEST marketing comp. Even semi-finalists get PPIs for HUL's ULIP internship.\n\nRound 1 = 3-slide submission. Your maths helps with market sizing. Focus on: deep consumer insight (talk to real people!), one killer idea with clear ROI, feasibility over flash.\n\nTip: They want marketing empathy, not just strategy jargon.", teammates: "", resources: [
    { name: "HUL Annual Report", url: "https://www.hul.co.in/investor-relations/annual-reports/", id: 4 },
    { name: "LIME case study analysis", url: "https://unstop.com/blog/hul-lime-case-study-bringing-the-brand-purpose-alive-and-taking-the-most-famous-b-school-case-study-competition-global", id: 5 },
    { name: "ABCDEF method for case comps", url: "https://insideiim.com/abcdef-the-6-step-method-to-do-well-in-case-study-competitions", id: 6 },
  ]},
  13: { priority: "high", status: "not_started", notes: "YOU WORKED AT ACCENTURE. Unfair advantage. You know their consulting frameworks, culture, and delivery model. Use terms: 'intelligent operations', 'industry X.0'.\n\nTop 8 nationally get Accenture mentor for finale prep. PPIs available.\n\nAngle: Digital transformation + change management (your instructional design = enterprise learning expertise).", teammates: "", resources: [
    { name: "Accenture Technology Vision", url: "https://www.accenture.com/us-en/insights/technology/technology-trends-2025", id: 7 },
    { name: "Challenge on Unstop", url: "https://unstop.com/competitions/accenture-b-school-strategy-challenge-season-9-accenture-1511069", id: 8 },
  ]},
  14: { priority: "high", status: "not_started", notes: "Flipkart's flagship. SPJIMR participates. Pick PRODUCT track — best for IM&A. 5-slide PPT.\n\nApproach e-commerce with data/analytics framing. Flipkart loves quantified impact.\n\nPick ONE track, go deep. Focus on user experience + unit economics.", teammates: "", resources: [
    { name: "WiRED case study history", url: "https://unstop.com/blog/flipkart-wired-case-study", id: 9 },
    { name: "Flipkart tech blog", url: "https://stories.flipkart.com/", id: 10 },
  ]},
  12: { priority: "high", status: "not_started", notes: "Ranked #1 B-school competition. UNIQUE: document-based submission (not PPT!) — benefits your strong analytical writing.\n\nStudy Amazon's 14 Leadership Principles! Quiz round tests these. Then document submission, then campus presentation.\n\nIM&A + maths = perfect for Amazon's data-driven culture. Frame everything around 'customer obsession' and 'working backwards'.", teammates: "", resources: [
    { name: "Amazon Leadership Principles", url: "https://www.aboutamazon.com/about-us/leadership-principles", id: 11 },
    { name: "ACE competition details", url: "https://www.aboutamazon.in/news/innovation/how-amazon-encourages-innovation-among-mba-students", id: 12 },
  ]},
  27: { priority: "high", status: "not_started", notes: "PERFECT for IM&A. Analytics & data science comp — predictive modeling for customer engagement.\n\nRound 1: Crossword (finance/analytics terms). Round 2: Actual data problem. Round 3: Deck.\n\nPrep: Python/pandas, logistic regression, customer segmentation. Your BSc Maths = genuine edge here.", teammates: "", resources: [
    { name: "Amex Challenge on Unstop", url: "https://unstop.com/competitions?q=american+express+campus+challenge", id: 13 },
    { name: "Kaggle Amex datasets", url: "https://www.kaggle.com/datasets?search=american+express", id: 14 },
  ]},
  33: { priority: "high", status: "not_started", notes: "WOMEN-ONLY by Flipkart. Less competition, same prestige. Absolutely do this.\n\nE-commerce product/business case. Your IM&A product thinking will shine. Team with women from different specializations.", teammates: "", resources: [
    { name: "Flipkart Vidyarthini Unstop", url: "https://unstop.com/competitions?q=flipkart+vidyarthini", id: 15 },
  ]},
  53: { priority: "high", status: "not_started", notes: "WOMEN-ONLY by top investment bank Avendus. M&A and investment banking cases.\n\nLow competition + high CV signal. Your quant background makes financial modeling approachable.\n\nPrep: Basic DCF, comparable company analysis, M&A rationale frameworks.", teammates: "", resources: [
    { name: "Avendus on Unstop", url: "https://unstop.com/competitions?q=avendus+banking+on+her", id: 16 },
    { name: "IB basics - WSO", url: "https://www.wallstreetoasis.com/resources/skills/finance/investment-banking-overview", id: 17 },
  ]},
  72: { priority: "high", status: "not_started", notes: "WOMEN-ONLY individual award by ITC. Essay + interview. No team needed.\n\nHighlight your journey: BSc Maths → Accenture → SPJIMR. The 'non-traditional path' angle is compelling.\n\nMUST APPLY — low effort, high reward, solo.", teammates: "", resources: [
    { name: "ITC Careers", url: "https://itcportal.com/careers/itc-interrobang.html", id: 23 },
  ]},
  31: { priority: "medium", status: "not_started", notes: "One of the most respected comps (formerly War Room). By Sep you'll have 2-3 comps done.\n\nMahindra values bold, implementable ideas. Get someone with operations knowledge on team.", teammates: "", resources: [
    { name: "Mahindra RISE Portal", url: "https://risechallenge.mahindra.com/", id: 18 },
  ]},
  50: { priority: "medium", status: "not_started", notes: "Capgemini ELITE program flagship. Business + tech cases. Your Accenture consulting background transfers directly.\n\nFocus on tech-enabled business transformation. PPIs for ELITE program.", teammates: "", resources: [
    { name: "L'Innovateur portal", url: "https://www.capgemini.com/in-en/careers/career-paths/students-and-graduates/management-graduates/elite-general-management-program/linnovateur-8-0/", id: 19 },
  ]},
  51: { priority: "medium", status: "not_started", notes: "UNIQUE: Write an actual consulting whitepaper. Your instructional design + structured writing from Accenture pays off.\n\nMost MBA students can't write well. You can. This is your secret weapon.", teammates: "", resources: [
    { name: "PwC India Insights", url: "https://www.pwc.in/research-and-insights.html", id: 20 },
  ]},
  23: { priority: "medium", status: "not_started", notes: "TAS flagship. Multi-domain across Tata companies. Very prestigious. PPO opportunity.\n\nTata values sustainability and nation-building in solutions.", teammates: "", resources: [
    { name: "TIC on Unstop", url: "https://unstop.com/competitions?q=tata+imagination+challenge", id: 21 },
  ]},
  28: { priority: "medium", status: "not_started", notes: "EY-Parthenon = top-tier strategy consulting. Good prep for consulting interviews too.\n\nStructure: market analysis → competitive landscape → financial feasibility → recommendation.", teammates: "", resources: [
    { name: "EY-Parthenon", url: "https://www.ey.com/en_in/services/strategy-and-transactions/ey-parthenon", id: 22 },
  ]},
  86: { priority: "medium", status: "not_started", notes: "ABG simulation. Strategy + marketing + finance + ops all at once. Real-time decisions.\n\nSPJIMR participates. PPIs available. Prep: Try Capsim or Markstrat simulations.", teammates: "", resources: [
    { name: "Stratos on Unstop", url: "https://unstop.com/competitions?q=stratos+business+simulation", id: 24 },
  ]},
  69: { priority: "medium", status: "not_started", notes: "JSW — growing conglomerate. PPO opportunity. Mentorship from JSW leaders.\n\nSteel/infra cases diversify your portfolio beyond FMCG.", teammates: "", resources: [
    { name: "JSW Group", url: "https://www.jsw.in/", id: 25 },
  ]},
  3: { priority: "low", status: "not_started", notes: "Global — winning team goes to Paris! 2026 runs Nov'25-Aug'26. Check if SPJIMR PG eligible.\n\nLong commitment but incredible brand value.", teammates: "", resources: [
    { name: "Brandstorm Platform", url: "https://brandstorm.loreal.com/en", id: 26 },
  ]},
  21: { priority: "low", status: "not_started", notes: "NBFC finance. Good practice before Amex Campus Challenge. Your maths helps with credit risk modeling.", teammates: "", resources: [] },
  9: { priority: "low", status: "not_started", notes: "HUL's finance track. If doing LIME, consider this too. P&L optimization and working capital.", teammates: "", resources: [] },
  76: { priority: "low", status: "not_started", notes: "Hero MotoCorp multi-domain. SPJIMR participates. ₹2.5L. By Jan you'll be seasoned — 'fun' comp.", teammates: "", resources: [] },
};

const CATEGORIES = ["All", "Strategy", "Product", "Marketing", "Finance", "Leadership", "General"];
const PERIODS = ["All", "Jun-Jul", "Jul-Aug", "Aug-Sep", "Sep-Oct", "Oct-Nov", "Nov-Dec", "Dec-Jan", "Jan-Feb", "Feb-Mar"];
const PRIORITY_LABELS = { high: "Must Do", medium: "Should Do", low: "Optional", none: "—" };
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2, none: 3 };
const CAT_COLORS = { Strategy: { text: "#e94560", badge: "rgba(233,69,96,0.15)" }, Product: { text: "#3a86ff", badge: "rgba(58,134,255,0.12)" }, Marketing: { text: "#e9b044", badge: "rgba(233,176,68,0.15)" }, Finance: { text: "#16c79a", badge: "rgba(22,199,154,0.15)" }, Leadership: { text: "#c77dff", badge: "rgba(199,125,255,0.15)" }, General: { text: "#7ec8e3", badge: "rgba(126,200,227,0.15)" } };
const PRIORITY_COLORS = { high: "#e94560", medium: "#e9b044", low: "#7ec8e3", none: "#333" };

const Ic = {
  X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Trash: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14"/></svg>,
  Note: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
  Search: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  Grid: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  List: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>,
  Target: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Ext: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>,
  Lnk: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  Fem: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff69b4" strokeWidth="2"><circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/></svg>,
};

function Badge({ label, color, textColor, s }) {
  return <span style={{ display: "inline-block", padding: s ? "2px 7px" : "3px 9px", borderRadius: "4px", fontSize: s ? "9px" : "10px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", background: color, color: textColor }}>{label}</span>;
}

function Modal({ comp, strategy, onSave, onClose }) {
  const [n, setN] = useState(strategy?.notes || "");
  const [p, setP] = useState(strategy?.priority || "none");
  const [res, setRes] = useState(strategy?.resources || []);
  const [rn, setRn] = useState(""); const [ru, setRu] = useState("");
  const [st, setSt] = useState(strategy?.status || "not_started");
  const [tm, setTm] = useState(strategy?.teammates || "");
  const ref = useRef();
  useEffect(() => { const h = e => { if (ref.current && !ref.current.contains(e.target)) onClose(); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, [onClose]);
  const cat = CAT_COLORS[comp.category]; const isW = [33, 53, 72].includes(comp.id);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "10px" }}>
      <div ref={ref} style={{ background: "#111118", border: "1px solid #2a2a3a", borderRadius: "12px", width: "100%", maxWidth: "580px", maxHeight: "90vh", overflow: "auto" }}>
        <div style={{ padding: "18px 18px 12px", borderBottom: "1px solid #1e1e2e" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                <Badge label={comp.category} color={cat.badge} textColor={cat.text} />
                {isW && <span style={{ fontSize: "9px", color: "#ff69b4", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}><Ic.Fem /> WOMEN ONLY</span>}
              </div>
              <h2 style={{ color: "#f0f0f0", fontSize: "16px", margin: "7px 0 2px", fontWeight: 700 }}>{comp.name}</h2>
              <p style={{ color: "#888", fontSize: "11px", margin: 0 }}>{comp.company} · {comp.period} · Team: {comp.teamSize}</p>
              <p style={{ color: "#666", fontSize: "10px", margin: "2px 0" }}>Reg: {comp.regWindow} · {comp.format}</p>
              <p style={{ color: "#999", fontSize: "12px", margin: "5px 0 0", lineHeight: 1.5 }}>{comp.desc}</p>
              <a href={comp.unstopUrl} target="_blank" rel="noreferrer" style={{ color: cat.text, fontSize: "10px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px", marginTop: "5px", fontWeight: 600 }}>Unstop / Registration <Ic.Ext /></a>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", marginLeft: "8px" }}><Ic.X /></button>
          </div>
        </div>
        <div style={{ padding: "14px 18px" }}>
          <div style={{ display: "flex", gap: "5px", marginBottom: "12px" }}>
            {["high", "medium", "low"].map(x => <button key={x} onClick={() => setP(p === x ? "none" : x)} style={{ flex: 1, padding: "7px", borderRadius: "6px", border: `1px solid ${p === x ? PRIORITY_COLORS[x] : "#2a2a3a"}`, background: p === x ? PRIORITY_COLORS[x] + "22" : "#1a1a24", color: p === x ? PRIORITY_COLORS[x] : "#777", fontSize: "10px", fontWeight: 600, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.5px" }}>{PRIORITY_LABELS[x]}</button>)}
          </div>
          <div style={{ display: "flex", gap: "5px", marginBottom: "12px" }}>
            {[{ k: "not_started", l: "Not Started" }, { k: "prepping", l: "Prepping" }, { k: "submitted", l: "Submitted" }, { k: "shortlisted", l: "Shortlisted" }].map(s => <button key={s.k} onClick={() => setSt(s.k)} style={{ flex: 1, padding: "6px", borderRadius: "6px", border: `1px solid ${st === s.k ? "#e94560" : "#2a2a3a"}`, background: st === s.k ? "rgba(233,69,96,0.12)" : "#1a1a24", color: st === s.k ? "#e94560" : "#777", fontSize: "9px", fontWeight: 600, cursor: "pointer" }}>{s.l}</button>)}
          </div>
          <input value={tm} onChange={e => setTm(e.target.value)} placeholder="Teammates (e.g. Priya - Marketing, Rohan - Finance)" style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #2a2a3a", background: "#1a1a24", color: "#ddd", fontSize: "12px", outline: "none", boxSizing: "border-box", marginBottom: "10px" }} />
          <textarea value={n} onChange={e => setN(e.target.value)} placeholder="Strategy notes..." rows={5} style={{ width: "100%", padding: "8px 10px", borderRadius: "6px", border: "1px solid #2a2a3a", background: "#1a1a24", color: "#ddd", fontSize: "12px", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6, marginBottom: "10px" }} />
          <div style={{ marginBottom: "10px" }}>
            <label style={{ color: "#888", fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Resources</label>
            {res.map(r => <div key={r.id} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 8px", background: "#1a1a24", borderRadius: "6px", marginTop: "4px", border: "1px solid #2a2a3a" }}>
              <Ic.Note /><span style={{ flex: 1, color: "#ccc", fontSize: "11px" }}>{r.url ? <a href={r.url} target="_blank" rel="noreferrer" style={{ color: cat.text, textDecoration: "none" }}>{r.name} <Ic.Ext /></a> : r.name}</span>
              <button onClick={() => setRes(res.filter(x => x.id !== r.id))} style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}><Ic.Trash /></button>
            </div>)}
            <div style={{ display: "flex", gap: "5px", marginTop: "6px" }}>
              <input value={rn} onChange={e => setRn(e.target.value)} placeholder="Name" style={{ flex: 2, padding: "7px 8px", borderRadius: "6px", border: "1px solid #2a2a3a", background: "#1a1a24", color: "#ddd", fontSize: "11px", outline: "none" }} />
              <input value={ru} onChange={e => setRu(e.target.value)} placeholder="URL" style={{ flex: 2, padding: "7px 8px", borderRadius: "6px", border: "1px solid #2a2a3a", background: "#1a1a24", color: "#ddd", fontSize: "11px", outline: "none" }} />
              <button onClick={() => { if (rn.trim()) { setRes([...res, { name: rn.trim(), url: ru.trim(), id: Date.now() }]); setRn(""); setRu(""); } }} style={{ background: cat.text, color: "#fff", border: "none", borderRadius: "6px", padding: "0 12px", cursor: "pointer", fontSize: "15px" }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 18px", borderTop: "1px solid #1e1e2e", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 16px", borderRadius: "7px", border: "1px solid #2a2a3a", background: "transparent", color: "#aaa", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Cancel</button>
          <button onClick={() => { onSave({ notes: n, priority: p, resources: res, status: st, teammates: tm }); onClose(); }} style={{ padding: "8px 20px", borderRadius: "7px", border: "none", background: cat.text, color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 700 }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function Card({ comp, strategy, onClick, view }) {
  const cat = CAT_COLORS[comp.category]; const pri = strategy?.priority || "none"; const isW = [33, 53, 72].includes(comp.id);
  if (view === "list") return (
    <div onClick={() => onClick(comp)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", background: "#111118", borderRadius: "7px", border: "1px solid #1a1a28", cursor: "pointer", transition: "all 0.15s" }} onMouseEnter={e => e.currentTarget.style.borderColor = cat.text + "33"} onMouseLeave={e => e.currentTarget.style.borderColor = "#1a1a28"}>
      {pri !== "none" && <div style={{ width: "3px", height: "24px", borderRadius: "2px", background: PRIORITY_COLORS[pri], flexShrink: 0 }} />}
      <Badge label={comp.category} color={cat.badge} textColor={cat.text} s />
      {isW && <Ic.Fem />}
      <span style={{ flex: 1, color: "#ddd", fontSize: "12px", fontWeight: 500 }}>{comp.name}</span>
      <span style={{ color: "#444", fontSize: "10px", minWidth: "48px" }}>{comp.period}</span>
      <span style={{ color: "#333", fontSize: "10px", minWidth: "70px" }}>{comp.company}</span>
      {strategy?.status && strategy.status !== "not_started" && <span style={{ fontSize: "8px", padding: "1px 5px", borderRadius: "3px", background: "rgba(233,69,96,0.1)", color: "#e94560", fontWeight: 600, textTransform: "uppercase" }}>{strategy.status.replace("_", " ")}</span>}
      {(strategy?.notes || strategy?.resources?.length > 0) && <Ic.Note />}
    </div>
  );
  return (
    <div onClick={() => onClick(comp)} style={{ background: "#111118", borderRadius: "9px", border: "1px solid #1a1a28", padding: "14px", cursor: "pointer", transition: "all 0.2s", borderTop: pri !== "none" ? `3px solid ${PRIORITY_COLORS[pri]}` : undefined }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}><Badge label={comp.category} color={cat.badge} textColor={cat.text} s />{isW && <Ic.Fem />}</div>
        {pri !== "none" && <span style={{ fontSize: "8px", color: PRIORITY_COLORS[pri], fontWeight: 700, textTransform: "uppercase" }}>{PRIORITY_LABELS[pri]}</span>}
      </div>
      <h3 style={{ color: "#eee", fontSize: "13px", fontWeight: 600, margin: "0 0 3px", lineHeight: 1.3 }}>{comp.name}</h3>
      <p style={{ color: "#555", fontSize: "10px", margin: "0 0 3px" }}>{comp.company} · {comp.period} · {comp.teamSize}</p>
      <p style={{ color: "#444", fontSize: "9px", margin: "0 0 6px" }}>{comp.regWindow}</p>
      {strategy?.status && strategy.status !== "not_started" && <span style={{ display: "inline-block", fontSize: "8px", padding: "2px 6px", borderRadius: "3px", background: "rgba(233,69,96,0.1)", color: "#e94560", fontWeight: 600, textTransform: "uppercase", marginBottom: "4px" }}>{strategy.status.replace("_", " ")}</span>}
      <div style={{ display: "flex", gap: "6px" }}>
        {strategy?.notes && <span style={{ color: "#444", display: "flex", alignItems: "center", gap: "2px", fontSize: "9px" }}><Ic.Note /> notes</span>}
        {strategy?.resources?.length > 0 && <span style={{ color: "#444", display: "flex", alignItems: "center", gap: "2px", fontSize: "9px" }}><Ic.Lnk /> {strategy.resources.length}</span>}
      </div>
    </div>
  );
}

export default function App() {
  const [strats, setStrats] = useState(() => {
    try {
      const saved = localStorage.getItem("cc_strategies");
      if (saved) return JSON.parse(saved);
    } catch {}
    return PRE_STRATEGIES;
  });
  useEffect(() => {
    try { localStorage.setItem("cc_strategies", JSON.stringify(strats)); } catch {}
  }, [strats]);
  const [cf, setCf] = useState("All"); const [pf, setPf] = useState("All");
  const [q, setQ] = useState(""); const [sort, setSort] = useState("priority");
  const [vw, setVw] = useState("grid"); const [modal, setModal] = useState(null);
  const [myOnly, setMyOnly] = useState(false);

  let list = COMPETITIONS.filter(c => {
    if (cf !== "All" && c.category !== cf) return false;
    if (pf !== "All" && c.period !== pf) return false;
    if (q && !c.name.toLowerCase().includes(q.toLowerCase()) && !c.company.toLowerCase().includes(q.toLowerCase())) return false;
    if (myOnly) { const s = strats[c.id]; if (!s || (s.priority === "none" && !s.notes && (!s.resources?.length))) return false; }
    return true;
  });
  if (sort === "timeline") list.sort((a, b) => ((a.month >= 6 ? a.month : a.month + 12) - (b.month >= 6 ? b.month : b.month + 12)));
  else if (sort === "priority") list.sort((a, b) => { const d = PRIORITY_ORDER[strats[a.id]?.priority || "none"] - PRIORITY_ORDER[strats[b.id]?.priority || "none"]; return d || ((a.month >= 6 ? a.month : a.month + 12) - (b.month >= 6 ? b.month : b.month + 12)); });
  else if (sort === "category") list.sort((a, b) => a.category.localeCompare(b.category));
  else list.sort((a, b) => a.company.localeCompare(b.company));

  const hi = Object.values(strats).filter(s => s.priority === "high").length;
  const tot = Object.values(strats).filter(s => s.priority !== "none").length;

  return (<>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@700&display=swap" rel="stylesheet" />
    <div style={{ minHeight: "100vh", background: "#0a0a10", color: "#e8e8e8", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid #181828" }}>
        <h1 style={{ fontSize: "20px", margin: "0 0 2px", fontFamily: "'Space Mono', monospace", fontWeight: 700, background: "linear-gradient(135deg, #e94560, #e9b044)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CASE COMP HQ</h1>
        <p style={{ color: "#444", fontSize: "11px", margin: "0 0 10px" }}>87 competitions · Pre-loaded strategies · Keep a track of everything – At one place</p>
        <div style={{ display: "flex", gap: "6px" }}>
          {[{ l: "Showing", v: list.length, c: "#ddd" }, { l: "Strategized", v: tot, c: "#16c79a" }, { l: "Must Do", v: hi, c: "#e94560" }].map(s => <div key={s.l} style={{ background: "#111118", borderRadius: "7px", padding: "7px 12px", border: "1px solid #1a1a28" }}><div style={{ fontSize: "18px", fontWeight: 700, color: s.c }}>{s.v}</div><div style={{ fontSize: "8px", color: "#555", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>{s.l}</div></div>)}
        </div>
      </div>
      <div style={{ padding: "10px 20px 10px", borderBottom: "1px solid #181828", background: "#0c0c14" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "6px", background: "#111118", borderRadius: "7px", border: "1px solid #252535", padding: "0 10px" }}>
            <Ic.Search />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." style={{ flex: 1, background: "transparent", border: "none", color: "#ddd", fontSize: "12px", padding: "8px 0", outline: "none" }} />
            {q && <button onClick={() => setQ("")} style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}><Ic.X /></button>}
          </div>
          <div style={{ display: "flex", gap: "2px", background: "#111118", borderRadius: "7px", border: "1px solid #252535", padding: "2px" }}>
            <button onClick={() => setVw("grid")} style={{ padding: "5px 7px", borderRadius: "5px", border: "none", cursor: "pointer", background: vw === "grid" ? "#252535" : "transparent", color: vw === "grid" ? "#ddd" : "#555" }}><Ic.Grid /></button>
            <button onClick={() => setVw("list")} style={{ padding: "5px 7px", borderRadius: "5px", border: "none", cursor: "pointer", background: vw === "list" ? "#252535" : "transparent", color: vw === "list" ? "#ddd" : "#555" }}><Ic.List /></button>
          </div>
        </div>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", alignItems: "center" }}>
          {CATEGORIES.map(c => { const a = cf === c; const col = CAT_COLORS[c] || {}; return <button key={c} onClick={() => setCf(c)} style={{ padding: "3px 9px", borderRadius: "5px", border: `1px solid ${a ? (col.text || "#e94560") : "#252535"}`, background: a ? (col.badge || "rgba(233,69,96,0.15)") : "transparent", color: a ? (col.text || "#e94560") : "#555", fontSize: "10px", fontWeight: 600, cursor: "pointer" }}>{c}</button>; })}
          <select value={pf} onChange={e => setPf(e.target.value)} style={{ padding: "3px 6px", borderRadius: "5px", border: "1px solid #252535", background: "#111118", color: pf !== "All" ? "#e9b044" : "#555", fontSize: "10px", fontWeight: 600, cursor: "pointer", outline: "none" }}>
            {PERIODS.map(p => <option key={p} value={p}>{p === "All" ? "All Periods" : p}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "3px 6px", borderRadius: "5px", border: "1px solid #252535", background: "#111118", color: "#555", fontSize: "10px", fontWeight: 600, cursor: "pointer", outline: "none" }}>
            <option value="priority">Priority</option><option value="timeline">Timeline</option><option value="category">Category</option><option value="company">Company A-Z</option>
          </select>
          <button onClick={() => setMyOnly(!myOnly)} style={{ padding: "3px 9px", borderRadius: "5px", border: `1px solid ${myOnly ? "#16c79a" : "#252535"}`, background: myOnly ? "rgba(22,199,154,0.12)" : "transparent", color: myOnly ? "#16c79a" : "#555", fontSize: "10px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "3px" }}><Ic.Target /> My Picks</button>
        </div>
      </div>
      <div style={{ padding: "14px 20px" }}>
        {list.length === 0 ? <div style={{ textAlign: "center", padding: "40px", color: "#444" }}>No matches</div> : vw === "grid" ? <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "8px" }}>{list.map(c => <Card key={c.id} comp={c} strategy={strats[c.id]} onClick={setModal} view="grid" />)}</div> : <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>{list.map(c => <Card key={c.id} comp={c} strategy={strats[c.id]} onClick={setModal} view="list" />)}</div>}
      </div>
      {modal && <Modal comp={modal} strategy={strats[modal.id]} onSave={d => setStrats(p => ({ ...p, [modal.id]: d }))} onClose={() => setModal(null)} />}
    </div>
  </>);
}
