import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, Play, Download, Heart, Sparkles, Filter, ShieldCheck, 
  Moon, Sun, Menu, X, ChevronRight, Copy, Check, Info, Film, 
  Smartphone, Monitor, Sliders, ExternalLink, RefreshCw, User, 
  Key, Trash2, Plus, ArrowUpRight, Award, Zap, Layers, FolderPlus,
  AlertCircle, BarChart3, CheckCircle2, FileText, Share2, HelpCircle
} from 'lucide-react';

// --- INITIAL SAMPLE VIDEO DATA ---
const INITIAL_VIDEOS = [
  {
    id: 'vid-1',
    title: 'Hutan Tropis Embun Pagi',
    category: 'Alam dan Pemandangan',
    tags: ['hutan', 'alam', 'embun', 'cinematic', 'hijau'],
    duration: '0:18',
    durationSec: 18,
    resolution: '4K Ultra HD',
    aspectRatio: '9:16',
    format: 'MP4',
    orientation: 'vertical',
    source: 'Pexels Verified',
    sourceUrl: 'https://images.pexels.com/video-files/856981/856981-hd_1080_1920_30fps.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-8767610419ea?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    license: 'Bebas Komersial',
    licenseType: 'commercial',
    attributionRequired: false,
    verified: true,
    views: 14200,
    downloads: 3820,
    isPopular: true,
    isEditorPick: true,
    isAffiliateFriendly: true,
    isNew: true,
    description: 'Bahan video cinematic pemandangan hutan tropis dengan efek cahaya matahari pagi menyusup di antara pepohonan. Sangat cocok untuk latar konten motivasi, narasi Islami, atau video rileksasi.'
  },
  {
    id: 'vid-2',
    title: 'Estetik Kopi Susu Kekinian',
    category: 'Makanan dan Minuman',
    tags: ['kopi', 'coffee', 'cafe', 'affiliate', 'estetik', 'produk'],
    duration: '0:12',
    durationSec: 12,
    resolution: '1080p Full HD',
    aspectRatio: '9:16',
    format: 'MP4',
    orientation: 'vertical',
    source: 'Pixabay Verified',
    sourceUrl: 'https://pixabay.com/videos',
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-glass-41467-large.mp4',
    license: 'Bebas Komersial',
    licenseType: 'commercial',
    attributionRequired: false,
    verified: true,
    views: 28900,
    downloads: 8910,
    isPopular: true,
    isEditorPick: true,
    isAffiliateFriendly: true,
    isNew: false,
    description: 'Video sinematik penuangan kopi susu ke dalam gelas transparan dengan pencahayaan warm lembut. Latar ideal untuk promosi affiliate peralatan kopi, konten cafe lifestyle, atau status WA estetik.'
  },
  {
    id: 'vid-3',
    title: 'Gedung Pencakar Langit Malam Hari',
    category: 'Kota dan Perjalanan',
    tags: ['kota', 'city', 'night', 'lampu', 'timelapse', 'bisnis'],
    duration: '0:25',
    durationSec: 25,
    resolution: '4K Ultra HD',
    aspectRatio: '16:9',
    format: 'MP4',
    orientation: 'horizontal',
    source: 'Pexels Verified',
    sourceUrl: 'https://pexels.com',
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4',
    license: 'Perlu Atribusi',
    licenseType: 'attribution',
    attributionRequired: true,
    attributionText: 'Video oleh UrbanStock dari ShortVideo Hub / Pexels',
    verified: true,
    views: 9400,
    downloads: 2150,
    isPopular: false,
    isEditorPick: true,
    isAffiliateFriendly: false,
    isNew: true,
    description: 'Pemandangan dari udara lalu lintas kendaraan malam hari di tengah megahnya pencakar langit metropolis. Cocok untuk video edukasi finansial, bisnis, atau latar musik synthwave.'
  },
  {
    id: 'vid-4',
    title: 'Bekerja dengan Laptop & Kopi',
    category: 'Bisnis dan Keuangan',
    tags: ['laptop', 'kerja', 'freelance', 'baca', 'fokus', 'affiliate'],
    duration: '0:15',
    durationSec: 15,
    resolution: '1080p Full HD',
    aspectRatio: '9:16',
    format: 'MP4',
    orientation: 'vertical',
    source: 'ShortVideo Vault',
    sourceUrl: 'https://shortvideohub.internal',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-43224-large.mp4',
    license: 'Bebas Komersial',
    licenseType: 'commercial',
    attributionRequired: false,
    verified: true,
    views: 41200,
    downloads: 12400,
    isPopular: true,
    isEditorPick: false,
    isAffiliateFriendly: true,
    isNew: false,
    description: 'Close-up jemari mengetik di keyboard laptop dengan pencahayaan cozy studio. Sangat populer untuk kreator niche affiliate produk IT, gadget, produktivitas, serta tips bisnis online.'
  },
  {
    id: 'vid-5',
    title: 'Lampu Neon Cyberpunk & Mobil Retro',
    category: 'Teknologi dan Futuristik',
    tags: ['cyberpunk', 'neon', 'futuristis', 'teknologi', 'synthwave'],
    duration: '0:20',
    durationSec: 20,
    resolution: '1080p Full HD',
    aspectRatio: '9:16',
    format: 'MP4',
    orientation: 'vertical',
    source: 'Pexels Verified',
    sourceUrl: 'https://pexels.com',
    thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-41552-large.mp4',
    license: 'Bebas Komersial',
    licenseType: 'commercial',
    attributionRequired: false,
    verified: true,
    views: 18300,
    downloads: 5120,
    isPopular: true,
    isEditorPick: true,
    isAffiliateFriendly: false,
    isNew: true,
    description: 'Terowongan cahaya neon futuristik warna ungu dan biru elektrik. Pilihan utama untuk intro podcast teknologi, video gaming, quotes misterius, atau background TikTok.'
  },
  {
    id: 'vid-6',
    title: 'Tetesan Air di Atas Daun Hijau',
    category: 'Video Islami dan Ketenangan',
    tags: ['air', 'hujan', 'tenang', 'relaksasi', 'nature', 'dzikir'],
    duration: '0:30',
    durationSec: 30,
    resolution: '4K Ultra HD',
    aspectRatio: '9:16',
    format: 'MP4',
    orientation: 'vertical',
    source: 'Pixabay Verified',
    sourceUrl: 'https://pixabay.com',
    thumbnail: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-water-drops-falling-on-a-green-leaf-41561-large.mp4',
    license: 'Bebas Komersial',
    licenseType: 'commercial',
    attributionRequired: false,
    verified: true,
    views: 31000,
    downloads: 9800,
    isPopular: true,
    isEditorPick: false,
    isAffiliateFriendly: false,
    isNew: false,
    description: 'Macro shot tetesan air bening perlahan meluncur di permukaan daun segar. Cocok untuk background video mutiara hadits, renungan malam, atau audio ASMR hujan.'
  },
  {
    id: 'vid-7',
    title: 'Unboxing Smartphone & Aksesoris',
    category: 'Produk dan Affiliate',
    tags: ['unboxing', 'hp', 'gadget', 'review', 'affiliate', 'shopee'],
    duration: '0:14',
    durationSec: 14,
    resolution: '1080p Full HD',
    aspectRatio: '9:16',
    format: 'MP4',
    orientation: 'vertical',
    source: 'Pexels Verified',
    sourceUrl: 'https://pexels.com',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-holding-a-smartphone-with-a-green-screen-41528-large.mp4',
    license: 'Penggunaan Pribadi / Edukasi',
    licenseType: 'personal',
    attributionRequired: true,
    attributionText: 'Kredit kepada TechCreator Hub ID',
    verified: true,
    views: 52000,
    downloads: 16400,
    isPopular: true,
    isEditorPick: true,
    isAffiliateFriendly: true,
    isNew: false,
    description: 'Bahan video aesthetic unboxing gadget dengan tangan. Memudahkan affiliate marketer menambahkan teks harga, stiker komisi, dan link bio TikTok/Reels.'
  },
  {
    id: 'vid-8',
    title: 'Gaya Busana Streetwear Minimalis',
    category: 'Kehidupan Sehari-hari',
    tags: ['outfit', 'fashion', 'ootd', 'streetwear', 'reels', 'pria'],
    duration: '0:16',
    durationSec: 16,
    resolution: '1080p Full HD',
    aspectRatio: '9:16',
    format: 'MP4',
    orientation: 'vertical',
    source: 'Pexels Verified',
    sourceUrl: 'https://pexels.com',
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-walking-down-a-street-in-slow-motion-41539-large.mp4',
    license: 'Bebas Komersial',
    licenseType: 'commercial',
    attributionRequired: false,
    verified: true,
    views: 12300,
    downloads: 3400,
    isPopular: false,
    isEditorPick: false,
    isAffiliateFriendly: true,
    isNew: true,
    description: 'Slow-motion berjalan santai di trotoar perkotaan memakai baju t-shirt oversize dan sepatu kets. Ideal untuk affiliate baju kaos, celana, atau vlog santai.'
  }
];

// --- ALL CATEGORIES SPECIFIED IN REQUIREMENT ---
const CATEGORIES = [
  { id: 'all', name: 'Semua Kategori', icon: '🔥', count: 120 },
  { id: 'Alam dan Pemandangan', name: 'Alam & Pemandangan', icon: '🌿', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=300&q=80' },
  { id: 'Cinematic', name: 'Cinematic', icon: '🎬', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=300&q=80' },
  { id: 'Kota dan Perjalanan', name: 'Kota & Perjalanan', icon: '🏙️', image: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=300&q=80' },
  { id: 'Kehidupan Sehari-hari', name: 'Kehidupan Sehari-hari', icon: '☕', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { id: 'Romantis dan Cinta', name: 'Romantis & Cinta', icon: '💖', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80' },
  { id: 'Motivasi dan Inspirasi', name: 'Motivasi & Inspirasi', icon: '🚀', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=300&q=80' },
  { id: 'Horor dan Misteri', name: 'Horor & Misteri', icon: '👻', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80' },
  { id: 'Anime dan Animasi', name: 'Anime & Animasi', icon: '🎨', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80' },
  { id: 'Teknologi dan Futuristik', name: 'Teknologi & Futuristik', icon: '🤖', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=300&q=80' },
  { id: 'Bisnis dan Keuangan', name: 'Bisnis & Keuangan', icon: '📈', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80' },
  { id: 'Produk dan Affiliate', name: 'Produk & Affiliate', icon: '🛍️', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80' },
  { id: 'Makanan dan Minuman', name: 'Makanan & Minuman', icon: '🍔', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80' },
  { id: 'Latar Belakang Video', name: 'Latar Belakang Video', icon: '✨', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=300&q=80' },
  { id: 'Transisi dan Efek Visual', name: 'Transisi & Efek Visual', icon: '⚡', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80' },
  { id: 'Video Islami dan Ketenangan', name: 'Video Islami & Ketenangan', icon: '🕌', image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=300&q=80' },
  { id: 'Video Vertikal 9:16', name: 'Vertikal 9:16 (Shorts/Reels)', icon: '📱', image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=300&q=80' },
  { id: 'Video Horizontal 16:9', name: 'Horizontal 16:9 (YouTube)', icon: '🖥️', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80' }
];

export default function App() {
  // Theme state
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('home'); // home, explore, ai-assistant, favorites, admin

  // Videos state
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Advanced Filter state
  const [filterOrientation, setFilterOrientation] = useState('all'); // all, vertical, horizontal
  const [filterResolution, setFilterResolution] = useState('all'); // all, 4K Ultra HD, 1080p Full HD
  const [filterLicense, setFilterLicense] = useState('all'); // all, commercial, attribution, personal
  const [filterDuration, setFilterDuration] = useState('all'); // all, short (<15s), medium (15-30s), long (>30s)
  const [sortBy, setSortBy] = useState('popular'); // popular, newest, relevance
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Favorites & Collections State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('svh_favorites');
      return saved ? JSON.parse(saved) : ['vid-1', 'vid-4'];
    } catch (e) {
      return ['vid-1', 'vid-4'];
    }
  });

  const [downloadHistory, setDownloadHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('svh_downloads');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Modal Preview & Download state
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeDownloadModal, setActiveDownloadModal] = useState(null);
  const [copiedAttribution, setCopiedAttribution] = useState(false);

  // Auth & Admin state
  const [user, setUser] = useState({ name: 'Kreator Pro', email: 'kreator@shortvideohub.com', role: 'admin' });
  const [showAuthModal, setShowAuthModal] = useState(false);

  // AI Assistant State
  const [aiTool, setAiTool] = useState('idea'); // idea, prompt, script, hook, caption, affiliate, storyboard, img2vid
  const [aiInputTopic, setAiInputTopic] = useState('');
  const [aiNiche, setAiNiche] = useState('Affiliate & Produk');
  const [aiPlatform, setAiPlatform] = useState('TikTok');
  const [aiTone, setAiTone] = useState('Persuasif & Menarik');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [aiCopied, setAiCopied] = useState(false);

  // Sync theme class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem('svh_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist Downloads
  useEffect(() => {
    localStorage.setItem('svh_downloads', JSON.stringify(downloadHistory));
  }, [downloadHistory]);

  const toggleFavorite = (vidId, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(vidId) ? prev.filter(id => id !== vidId) : [...prev, vidId]
    );
  };

  // Filtered Videos calculation
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = video.title.toLowerCase().includes(q);
        const matchDesc = video.description.toLowerCase().includes(q);
        const matchTags = video.tags.some(t => t.toLowerCase().includes(q));
        const matchCat = video.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTags && !matchCat) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'Video Vertikal 9:16' && video.orientation !== 'vertical') return false;
        if (selectedCategory === 'Video Horizontal 16:9' && video.orientation !== 'horizontal') return false;
        if (selectedCategory !== 'Video Vertikal 9:16' && selectedCategory !== 'Video Horizontal 16:9') {
          if (video.category !== selectedCategory) return false;
        }
      }

      // Orientation filter
      if (filterOrientation !== 'all' && video.orientation !== filterOrientation) return false;

      // Resolution filter
      if (filterResolution !== 'all' && video.resolution !== filterResolution) return false;

      // License filter
      if (filterLicense !== 'all' && video.licenseType !== filterLicense) return false;

      // Duration filter
      if (filterDuration === 'short' && video.durationSec >= 15) return false;
      if (filterDuration === 'medium' && (video.durationSec < 15 || video.durationSec > 30)) return false;
      if (filterDuration === 'long' && video.durationSec <= 30) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.views - a.views;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      return 0;
    });
  }, [videos, searchQuery, selectedCategory, filterOrientation, filterResolution, filterLicense, filterDuration, sortBy]);

  // Execute AI Generator Tool using Gemini API
  const handleGenerateAI = async () => {
    if (!aiInputTopic.trim()) {
      setAiResult('Mohon masukkan topik atau kata kunci utama terlebih dahulu.');
      return;
    }

    setAiLoading(true);
    setAiResult('');
    setAiCopied(false);

    let systemPrompt = "Anda adalah pakar Strategi Konten Media Sosial & AI Video Creator terkemuka di Indonesia. Berikan respon profesional, terstruktur rapi, siap pakai, dalam bahasa Indonesia yang komunikatif.";
    
    let userPrompt = "";

    switch (aiTool) {
      case 'idea':
        userPrompt = `Buatkan 5 ide konsep video pendek viral di ${aiPlatform} untuk ceruk/niche "${aiNiche}" dengan topik "${aiInputTopic}". Sertakan judul yang menggugah rasa penasaran, gambaran visual (shot list singkat), dan alasan mengapa ide ini berpotensi FYP. Gaya bahasa: ${aiTone}.`;
        break;
      case 'prompt':
        userPrompt = `Buatkan 3 prompt AI Video Generation tingkat lanjut (untuk Sora / Runway Gen-2 / Pika Labs / Luma Dream Machine) dalam Bahasa Inggris dan Bahasa Indonesia berdasarkan ide: "${aiInputTopic}". Sertakan instruksi detail tentang lighting, camera movement, render quality, aspect ratio (9:16), dan artistic style.`;
        break;

      case 'script':
        userPrompt = `Tuliskan naskah/script voiceover narasi Bahasa Indonesia durasi 15-30 detik untuk video ${aiPlatform} tentang "${aiInputTopic}". Gunakan gaya ${aiTone}. Format naskah dengan petunjuk waktu [00:00], teks voiceover, dan instruksi rekaman visual yang sesuai.`;
        break;

      case 'hook':
        userPrompt = `Buatkan 7 variasi Hook 3 Detik Pertama (kalimat pembuka super catchy) untuk video pendek tentang "${aiInputTopic}" di ${aiPlatform}. Kategorikan ke dalam: (1) Penasaran/Misteri, (2) Masalah & Solusi, (3) Kontroversi/Unik, (4) Angka/Fakta Mengejutkan.`;
        break;

      case 'caption':
        userPrompt = `Tuliskan 3 pilihan Caption estetik & menjual beserta 15 Hashtag populer + niche relevan untuk postingan ${aiPlatform} tentang "${aiInputTopic}". Sertakan Call-To-Action (CTA) yang kuat untuk meningkatkan komen & simpan video.`;
        break;

      case 'affiliate':
        userPrompt = `Tuliskan naskah Soft-selling Affiliate TikTok/Reels untuk produk "${aiInputTopic}" (Niche: ${aiNiche}). Struktur wajib: 1. Hook masalah (3s), 2. Demo visual & keunggulan (10s), 3. Trik diskon/panggilan bertindak ke keranjang kuning/link bio (5s).`;
        break;

      case 'storyboard':
        userPrompt = `Buatkan Storyboard sederhana (Scene 1 sampai Scene 5) untuk video pendek 15 detik bertema "${aiInputTopic}". Tuliskan kolom: Scene No, Durasi, Visual Shot (Kamera), Teks On-Screen, dan Voiceover / Audio FX.`;
        break;

      case 'img2vid':
        userPrompt = `Buatkan prompt instruksi pergerakan gambar (Image-to-Video Animation Prompt) untuk diinput ke Midjourney / Kling AI / Haiper AI berdasarkan deskripsi gambar: "${aiInputTopic}". Fokus pada animasi kamera (pan/zoom/tilt) dan pergerakan elemen objek secara halus.`;
        break;

      default:
        userPrompt = `Berikan rekomendasi bahan video pendek untuk topik: ${aiInputTopic}`;
    }

    try {
      // Call Gemini API via fetch (empty apiKey uses runtime environment default)
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        setAiResult(generatedText);
      } else {
        setAiResult("Gagal mendapatkan respon dari AI Assistant. Silakan coba beberapa saat lagi.");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      // Fallback demo response if API fails or offline
      setAiResult(`⚡ [HASIL GENERATOR AI - SIMULASI OFFLINE]\n\nTopik: ${aiInputTopic}\nPlatform: ${aiPlatform}\nGaya: ${aiTone}\n\n1. HOOK UTAMA (0-3s):\n"Jangan pernah beli ${aiInputTopic} sebelum kamu tahu rahasia kecil ini..."\n\n2. VISUAL SUGGESTION:\n- Ambil video close-up produk dengan pencahayaan warm.\n- Gunakan efek transisi cepat per 1.5 detik.\n\n3. CALL TO ACTION:\n"Klik ikon keranjang kuning di pojok kiri bawah sebelum promonya habis hari ini!"`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleDownloadClick = (video, e) => {
    if (e) e.stopPropagation();
    setActiveDownloadModal(video);
  };

  const executeDownload = (video) => {
    // Record download log
    const logItem = {
      id: Date.now(),
      videoId: video.id,
      title: video.title,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      format: video.format,
      resolution: video.resolution
    };
    setDownloadHistory(prev => [logItem, ...prev]);

    // Create trigger link
    const link = document.createElement('a');
    link.href = video.videoUrl;
    link.download = `${video.title.toLowerCase().replace(/\s+/g, '-')}-shortvideohub.${video.format.toLowerCase()}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Increment local counter
    setVideos(prev => prev.map(v => v.id === video.id ? { ...v, downloads: v.downloads + 1 } : v));
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${theme === 'dark' ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* --- TOP NAVBAR --- */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        theme === 'dark' ? 'bg-[#0b0f19]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                ShortVideo <span className="text-violet-500 font-black">HUB</span>
              </span>
              <span className="block text-[10px] text-violet-400 font-medium tracking-wider uppercase -mt-1">
                Library & AI Tools
              </span>
            </div>
          </div>

          {/* Quick Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/40 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-700/50">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'home' 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'explore' 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Katalog Video
            </button>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'ai-assistant' 
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              AI Assistant
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'favorites' 
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Koleksi ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'admin' 
                  ? 'bg-amber-600 text-white shadow-md' 
                  : 'text-amber-400/80 hover:text-amber-300'
              }`}
            >
              Admin Panel
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Ganti Mode Tampilan"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Profile Avatar / Login */}
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-700/60 hover:border-violet-500/60 bg-slate-800/40 text-xs font-medium transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-[10px]">
                KP
              </div>
              <span className="hidden sm:inline">{user.name}</span>
            </button>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-800 px-2 py-2 bg-[#0b0f19]">
          <button 
            onClick={() => setActiveTab('home')}
            className={`text-xs font-medium px-3 py-1 rounded-lg ${activeTab === 'home' ? 'text-violet-400 bg-violet-500/10' : 'text-slate-400'}`}
          >
            Beranda
          </button>
          <button 
            onClick={() => setActiveTab('explore')}
            className={`text-xs font-medium px-3 py-1 rounded-lg ${activeTab === 'explore' ? 'text-violet-400 bg-violet-500/10' : 'text-slate-400'}`}
          >
            Katalog
          </button>
          <button 
            onClick={() => setActiveTab('ai-assistant')}
            className={`text-xs font-medium px-3 py-1 rounded-lg flex items-center gap-1 ${activeTab === 'ai-assistant' ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-400'}`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400" /> AI Tools
          </button>
          <button 
            onClick={() => setActiveTab('favorites')}
            className={`text-xs font-medium px-3 py-1 rounded-lg ${activeTab === 'favorites' ? 'text-violet-400 bg-violet-500/10' : 'text-slate-400'}`}
          >
            Koleksi
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`text-xs font-medium px-3 py-1 rounded-lg ${activeTab === 'admin' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
          >
            Admin
          </button>
        </div>
      </header>


      {/* ==================== MAIN CONTENT AREA ==================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ================= SECTION: BERANDA / HOME ================= */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            
            {/* HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-slate-800 bg-gradient-to-b from-slate-900 via-[#0f172a] to-[#0b0f19] text-center shadow-2xl">
              {/* Background ambient lighting */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  100% Terverifikasi Bebas Digunakan Kreator
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Semua Bahan Video Kreatif, dalam <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">Satu Tempat.</span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base font-normal max-w-2xl mx-auto">
                  Temukan video pendek gratis berkualitas tinggi untuk membuat konten TikTok, Reels, Shorts, video affiliate, dan narasi sinematik yang lebih menarik.
                </p>

                {/* SEARCH BAR IN HERO */}
                <div className="pt-2">
                  <div className="relative max-w-xl mx-auto">
                    <input
                      type="text"
                      placeholder="Cari video alam, cinematic, motivasi, romantis, affiliate..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setActiveTab('explore');
                      }}
                      className="w-full pl-12 pr-28 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-slate-400 text-sm shadow-xl backdrop-blur-md transition-all outline-none"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold hover:brightness-110 shadow-md transition-all"
                    >
                      Cari Video
                    </button>
                  </div>

                  {/* Hot tags */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
                    <span className="text-slate-500">Pencarian Populer:</span>
                    {['kopi estetik', 'hutan 4k', 'cyberpunk', 'affiliate hp', 'islami'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSearchQuery(tag);
                          setActiveTab('explore');
                        }}
                        className="hover:text-violet-300 transition-colors bg-slate-800/40 px-2.5 py-1 rounded-md border border-slate-700/40"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Buttons */}
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setActiveTab('explore');
                    }}
                    className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold shadow-lg shadow-violet-600/30 transition-all flex items-center gap-2"
                  >
                    <Film className="w-4 h-4" />
                    Jelajahi Semua Video
                  </button>
                  <button
                    onClick={() => setActiveTab('ai-assistant')}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-bold transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Buka AI Assistant
                  </button>
                </div>
              </div>
            </div>


            {/* CATEGORIES GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Kategori Populer</h2>
                  <p className="text-xs text-slate-400">Pilih jenis bahan video sesuai kebutuhan ceruk konten Anda</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
                >
                  Lihat Semua ({CATEGORIES.length - 1}) <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {CATEGORIES.slice(1, 13).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveTab('explore');
                    }}
                    className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 h-28 cursor-pointer hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all"
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
                      <span className="text-lg mb-0.5">{cat.icon}</span>
                      <span className="text-xs font-bold text-white leading-snug group-hover:text-violet-300 transition-colors">
                        {cat.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* VERTICAL VIDEOS SECTION (SHORTS / REELS / TIKTOK) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Video Vertikal (9:16)</h2>
                    <p className="text-xs text-slate-400">Bahan rasio khusus TikTok, Instagram Reels & YouTube Shorts</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('Video Vertikal 9:16');
                    setActiveTab('explore');
                  }}
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300"
                >
                  Lihat Lagi
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.filter(v => v.orientation === 'vertical').slice(0, 4).map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    isFav={favorites.includes(video.id)}
                    onToggleFav={(e) => toggleFavorite(video.id, e)}
                    onOpenModal={() => setActiveVideoModal(video)}
                    onDownload={(e) => handleDownloadClick(video, e)}
                  />
                ))}
              </div>
            </div>


            {/* AFFILIATE SPECIAL SECTION */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 via-slate-900 to-cyan-900/20 border border-purple-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[11px] font-bold uppercase tracking-wider">
                    Khusus Affiliate Marketer
                  </span>
                  <h3 className="text-xl font-bold">Bahan Video Produk & Estetik Siap Edit</h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Tingkatkan CTR penjualan affiliate Shopee, TikTok Shop, dan Tokopedia dengan video aesthetic unboxing, penuangan kopi, dan style hidup.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('Produk dan Affiliate');
                    setActiveTab('explore');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shrink-0"
                >
                  Lihat Video Affiliate
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                {videos.filter(v => v.isAffiliateFriendly).slice(0, 4).map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    isFav={favorites.includes(video.id)}
                    onToggleFav={(e) => toggleFavorite(video.id, e)}
                    onOpenModal={() => setActiveVideoModal(video)}
                    onDownload={(e) => handleDownloadClick(video, e)}
                  />
                ))}
              </div>
            </div>


            {/* POPULAR & EDITOR'S PICK TABS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Pilihan Editor & Paling Banyak Diunduh
                </h2>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300"
                >
                  Buka Katalog Lengkap
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {videos.filter(v => v.isEditorPick || v.isPopular).slice(0, 4).map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    isFav={favorites.includes(video.id)}
                    onToggleFav={(e) => toggleFavorite(video.id, e)}
                    onOpenModal={() => setActiveVideoModal(video)}
                    onDownload={(e) => handleDownloadClick(video, e)}
                  />
                ))}
              </div>
            </div>

          </div>
        )}


        {/* ================= SECTION: EXPLORE / KATALOG ================= */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
              <div>
                <h1 className="text-2xl font-bold">Katalog Bahan Video</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Menampilkan <span className="text-violet-400 font-bold">{filteredVideos.length}</span> video gratis terverifikasi
                </p>
              </div>

              {/* Search Bar in Explore */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <input
                    type="text"
                    placeholder="Cari kata kunci..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>

                <button
                  onClick={() => setShowFilterModal(!showFilterModal)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    showFilterModal || filterOrientation !== 'all' || filterResolution !== 'all' || filterLicense !== 'all'
                      ? 'bg-violet-600 text-white border-violet-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>


            {/* CATEGORY SCROLL PILLS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>


            {/* ADVANCED FILTER PANEL (EXPANDABLE) */}
            {showFilterModal && (
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-violet-400" /> Filter Lanjutan Video
                  </h3>
                  <button
                    onClick={() => {
                      setFilterOrientation('all');
                      setFilterResolution('all');
                      setFilterLicense('all');
                      setFilterDuration('all');
                      setSortBy('popular');
                    }}
                    className="text-xs text-slate-400 hover:text-violet-400 underline"
                  >
                    Reset Filter
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  {/* Orientation */}
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">Orientasi Layar</label>
                    <select
                      value={filterOrientation}
                      onChange={(e) => setFilterOrientation(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                    >
                      <option value="all">Semua Rasio</option>
                      <option value="vertical">Vertikal (9:16)</option>
                      <option value="horizontal">Horizontal (16:9)</option>
                    </select>
                  </div>

                  {/* Resolution */}
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">Resolusi Kualitas</label>
                    <select
                      value={filterResolution}
                      onChange={(e) => setFilterResolution(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                    >
                      <option value="all">Semua Resolusi</option>
                      <option value="4K Ultra HD">4K Ultra HD</option>
                      <option value="1080p Full HD">1080p Full HD</option>
                    </select>
                  </div>

                  {/* License */}
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">Lisensi Penggunaan</label>
                    <select
                      value={filterLicense}
                      onChange={(e) => setFilterLicense(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                    >
                      <option value="all">Semua Lisensi</option>
                      <option value="commercial">Bebas Komersial</option>
                      <option value="attribution">Perlu Atribusi</option>
                      <option value="personal">Penggunaan Pribadi</option>
                    </select>
                  </div>

                  {/* Sorting */}
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-medium">Urutkan Berdasarkan</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                    >
                      <option value="popular">Paling Populer</option>
                      <option value="newest">Terbaru</option>
                      <option value="downloads">Unduhan Terbanyak</option>
                    </select>
                  </div>
                </div>
              </div>
            )}


            {/* VIDEO GRID LIST */}
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredVideos.map(video => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    isFav={favorites.includes(video.id)}
                    onToggleFav={(e) => toggleFavorite(video.id, e)}
                    onOpenModal={() => setActiveVideoModal(video)}
                    onDownload={(e) => handleDownloadClick(video, e)}
                  />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Film className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold">Tidak ada video yang sesuai</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Coba ubah kata kunci pencarian atau sesuaikan filter kategori dan orientasi video Anda.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setFilterOrientation('all');
                    setFilterResolution('all');
                    setFilterLicense('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-all"
                >
                  Reset Semua Filter
                </button>
              </div>
            )}

          </div>
        )}


        {/* ================= SECTION: AI VIDEO ASSISTANT ================= */}
        {activeTab === 'ai-assistant' && (
          <div className="space-y-6">
            
            {/* Header AI */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-slate-900 border border-violet-500/30">
              <div className="max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Asisten Kreator Berbasis Gemini AI
                </div>
                <h1 className="text-2xl sm:text-3xl font-black">AI Video Assistant</h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Buat ide konten, prompt pembuat video AI, narasi voiceover Bahasa Indonesia, hook 3 detik, hingga naskah affiliate dalam hitungan detik.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT: TOOLS SELECTION & FORM */}
              <div className="lg:col-span-5 space-y-5 bg-slate-900/80 p-5 sm:p-6 rounded-2xl border border-slate-800">
                
                {/* Tool Selector Buttons */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Pilih Alat AI:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'idea', label: 'Generator Ide Konten', icon: '💡' },
                      { id: 'prompt', label: 'Prompt Video AI (Sora/Runway)', icon: '🎨' },
                      { id: 'script', label: 'Narasi Bahasa Indonesia', icon: '🎙️' },
                      { id: 'hook', label: 'Hook 3 Detik FYP', icon: '⚡' },
                      { id: 'caption', label: 'Caption & Hashtag', icon: '📝' },
                      { id: 'affiliate', label: 'Naskah Affiliate', icon: '🛍️' },
                      { id: 'storyboard', label: 'Generator Storyboard', icon: '🎬' },
                      { id: 'img2vid', label: 'Prompt Image-to-Video', icon: '🖼️' },
                    ].map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => setAiTool(tool.id)}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all flex items-center gap-2 ${
                          aiTool === tool.id
                            ? 'bg-violet-600/20 border-violet-500 text-violet-200'
                            : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span>{tool.icon}</span>
                        <span className="truncate">{tool.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Input */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Topik Utama / Kata Kunci / Nama Produk <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Kopi estetik, HP Murah Kamera Jernih, Hutan Tropis..."
                      value={aiInputTopic}
                      onChange={(e) => setAiInputTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Platform Tujuan</label>
                      <select
                        value={aiPlatform}
                        onChange={(e) => setAiPlatform(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200"
                      >
                        <option value="TikTok">TikTok</option>
                        <option value="Instagram Reels">Instagram Reels</option>
                        <option value="YouTube Shorts">YouTube Shorts</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Gaya / Nada</label>
                      <select
                        value={aiTone}
                        onChange={(e) => setAiTone(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-slate-200"
                      >
                        <option value="Persuasif & Menarik">Persuasif & Menarik</option>
                        <option value="Santai & Estetik">Santai & Estetik</option>
                        <option value="Inspiratif & Emosional">Inspiratif & Emosional</option>
                        <option value="Edukatif & Luwes">Edukatif & Luwes</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateAI}
                    disabled={aiLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {aiLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Sedang Memproses AI...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Generate Sekarang
                      </>
                    )}
                  </button>
                </div>

              </div>


              {/* RIGHT: OUTPUT RESULT BOARD */}
              <div className="lg:col-span-7 bg-slate-900/80 p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 min-h-[400px]">
                
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" /> Hasil Generator AI
                    </span>

                    {aiResult && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(aiResult);
                          setAiCopied(true);
                          setTimeout(() => setAiCopied(false), 2000);
                        }}
                        className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-all"
                      >
                        {aiCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {aiCopied ? 'Tersalin!' : 'Salin Teks'}
                      </button>
                    )}
                  </div>

                  {aiResult ? (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap max-h-[480px] overflow-y-auto">
                      {aiResult}
                    </div>
                  ) : (
                    <div className="text-center py-20 text-slate-500 space-y-2">
                      <Sparkles className="w-10 h-10 mx-auto opacity-30 text-cyan-400" />
                      <p className="text-xs">Pilih alat, masukkan topik di sebelah kiri, dan klik "Generate Sekarang".</p>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-3 flex items-center justify-between">
                  <span>Powered by Gemini AI Engine</span>
                  <span>100% Gratis untuk Penggunaan Kreator</span>
                </div>

              </div>

            </div>

          </div>
        )}


        {/* ================= SECTION: FAVORITES & COLLECTIONS ================= */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Koleksi Saya</h1>
                <p className="text-xs text-slate-400">Video favorit tersimpan dan riwayat unduhan bahan Anda</p>
              </div>

              <div className="text-xs text-slate-300 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
                Tersimpan: <span className="font-bold text-violet-400">{favorites.length} Video</span>
              </div>
            </div>

            {/* Favorite Video List */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" /> Video Favorit Saya
              </h2>

              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.filter(v => favorites.includes(v.id)).map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video} 
                      isFav={true}
                      onToggleFav={(e) => toggleFavorite(video.id, e)}
                      onOpenModal={() => setActiveVideoModal(video)}
                      onDownload={(e) => handleDownloadClick(video, e)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  Belum ada video yang ditambahkan ke favorit. Klik tombol ikon hati pada kartu video.
                </div>
              )}
            </div>

            {/* Download History */}
            <div className="space-y-3 pt-6 border-t border-slate-800">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Download className="w-5 h-5 text-cyan-400" /> Riwayat Unduhan Terakhir
              </h2>

              {downloadHistory.length > 0 ? (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-xs">
                  <div className="divide-y divide-slate-800">
                    {downloadHistory.map(item => (
                      <div key={item.id} className="p-3.5 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-200">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.date} • {item.resolution} • {item.format}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 text-[10px] font-bold">
                          Berhasil Diunduh
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">Belum ada riwayat unduhan pada sesi ini.</p>
              )}
            </div>
          </div>
        )}


        {/* ================= SECTION: ADMIN DASHBOARD ================= */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  Panel Moderasi Admin
                </span>
                <h1 className="text-2xl font-bold mt-1">Sistem Manajemen & Lisensi Video</h1>
              </div>

              <div className="text-right text-xs text-slate-400">
                Logged as: <span className="text-amber-400 font-bold">{user.email}</span>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Total Katalog Video</p>
                <p className="text-2xl font-bold text-white mt-1">{videos.length}</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Lisensi Terverifikasi</p>
                <p className="text-2xl font-bold text-green-400 mt-1">100%</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Total Unduhan Pengguna</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">58,700+</p>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Integrasi API Aktif</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">Pexels & Pixabay</p>
              </div>
            </div>

            {/* Video Management Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold">Daftar Aset & Status Verifikasi Lisensi</h3>
                <span className="text-xs text-slate-400">Admin Controls Active</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Video</th>
                      <th className="p-3">Kategori</th>
                      <th className="p-3">Sumber API</th>
                      <th className="p-3">Status Lisensi</th>
                      <th className="p-3">Unduhan</th>
                      <th className="p-3 text-right">Aksi Moderasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {videos.map(v => (
                      <tr key={v.id} className="hover:bg-slate-800/50">
                        <td className="p-3 flex items-center gap-2">
                          <img src={v.thumbnail} alt="" className="w-8 h-8 rounded object-cover" />
                          <span className="font-medium text-slate-200 max-w-xs truncate">{v.title}</span>
                        </td>
                        <td className="p-3">{v.category}</td>
                        <td className="p-3"><span className="text-cyan-400 font-mono">{v.source}</span></td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold">
                            {v.license}
                          </span>
                        </td>
                        <td className="p-3">{v.downloads.toLocaleString()}</td>
                        <td className="p-3 text-right space-x-2">
                          <button 
                            onClick={() => {
                              setVideos(prev => prev.filter(item => item.id !== v.id));
                            }}
                            className="p-1 rounded hover:bg-red-500/20 text-red-400" 
                            title="Hapus Video"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>


      {/* ==================== VIDEO PLAYBACK DETAIL MODAL ==================== */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl max-h-[90vh] flex flex-col lg:flex-row">
            
            {/* Left: Video Player */}
            <div className="lg:w-1/2 bg-black flex items-center justify-center relative min-h-[300px]">
              <video
                src={activeVideoModal.videoUrl}
                controls
                autoPlay
                loop
                className="w-full h-full max-h-[500px] object-contain"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 text-white text-[10px] font-bold backdrop-blur-sm">
                {activeVideoModal.aspectRatio} • {activeVideoModal.resolution}
              </span>
            </div>

            {/* Right: Metadata & Actions */}
            <div className="lg:w-1/2 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/30 text-violet-300 text-[11px] font-bold">
                    {activeVideoModal.category}
                  </span>
                  <button
                    onClick={() => setActiveVideoModal(null)}
                    className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-xl font-bold leading-snug">{activeVideoModal.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed">{activeVideoModal.description}</p>

                {/* Specs Badge */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Durasi:</span>
                    <span className="font-semibold text-slate-200">{activeVideoModal.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Format:</span>
                    <span className="font-semibold text-slate-200">{activeVideoModal.format}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Sumber API:</span>
                    <span className="font-semibold text-cyan-400">{activeVideoModal.source}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Lisensi:</span>
                    <span className="font-semibold text-green-400">{activeVideoModal.license}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeVideoModal.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    executeDownload(activeVideoModal);
                    setActiveVideoModal(null);
                  }}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Unduh Video Sekarang
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => toggleFavorite(activeVideoModal.id, e)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(activeVideoModal.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {favorites.includes(activeVideoModal.id) ? 'Disukai' : 'Suka'}
                  </button>

                  <a
                    href={activeVideoModal.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Buka Sumber Asli
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}


      {/* ==================== VERIFIED DOWNLOAD CONFIRMATION MODAL ==================== */}
      {activeDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-400" /> Informasi Lisensi & Unduhan
              </span>
              <button
                onClick={() => setActiveDownloadModal(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-400">Judul File:</p>
                <p className="font-bold text-slate-100 text-sm">{activeDownloadModal.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Resolusi:</span>
                  <span className="font-medium text-slate-200">{activeDownloadModal.resolution}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Format:</span>
                  <span className="font-medium text-slate-200">{activeDownloadModal.format}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status Lisensi:</span>
                  <span className="font-bold text-green-400">{activeDownloadModal.license}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Sumber API:</span>
                  <span className="font-medium text-cyan-400">{activeDownloadModal.source}</span>
                </div>
              </div>

              {activeDownloadModal.attributionRequired ? (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5">
                  <p className="text-amber-300 font-bold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" /> Wajib Mencantumkan Atribusi
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Salin teks kredit berikut ke dalam deskripsi postingan Anda:
                  </p>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 text-[11px]">
                    <span className="truncate flex-1 font-mono">{activeDownloadModal.attributionText}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeDownloadModal.attributionText);
                        setCopiedAttribution(true);
                        setTimeout(() => setCopiedAttribution(false), 2000);
                      }}
                      className="p-1 text-violet-400 hover:text-white"
                    >
                      {copiedAttribution ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
                  <span>Bebas diubah dan digunakan untuk keperluan komersial tanpa kewajiban atribusi.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveDownloadModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  executeDownload(activeDownloadModal);
                  setActiveDownloadModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30"
              >
                Konfirmasi Unduh
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ==================== FOOTER ==================== */}
      <footer className="mt-20 border-t border-slate-800/80 bg-[#090c14] text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-xs">
                SV
              </div>
              <span className="font-bold text-white text-base">ShortVideo Hub</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Platform perpustakaan bahan video pendek gratis terpusat untuk membantu kreator konten Indonesia berkarya lebih produktif.
            </p>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold mb-3 text-xs uppercase tracking-wider">Navigasi Platform</h4>
            <ul className="space-y-2 text-[11px]">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-violet-400">Beranda Utam</button></li>
              <li><button onClick={() => setActiveTab('explore')} className="hover:text-violet-400">Katalog Video Gratis</button></li>
              <li><button onClick={() => setActiveTab('ai-assistant')} className="hover:text-violet-400">AI Content Generator</button></li>
              <li><button onClick={() => setActiveTab('favorites')} className="hover:text-violet-400">Koleksi Tersimpan</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold mb-3 text-xs uppercase tracking-wider">Informasi & Lisensi</h4>
            <ul className="space-y-2 text-[11px]">
              <li><a href="#license" className="hover:text-violet-400">Kebijakan Lisensi Verifikasi</a></li>
              <li><a href="#terms" className="hover:text-violet-400">Ketentuan Penggunaan Aset</a></li>
              <li><a href="#privacy" className="hover:text-violet-400">Kebijakan Privasi</a></li>
              <li><a href="#contact" className="hover:text-violet-400">Hubungi Tim Kurator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-bold mb-3 text-xs uppercase tracking-wider">Penyedia Resmi API</h4>
            <p className="text-[11px] leading-relaxed text-slate-400 mb-2">
              Seluruh video eksternal diambil melalui API resmi Pexels & Pixabay dengan kepatuhan atribusi hak cipta penuh.
            </p>
            <span className="inline-block px-2 py-1 rounded bg-slate-800 text-green-400 text-[10px] font-mono">
              API Status: Online & Verified
            </span>
          </div>

        </div>

        <div className="border-t border-slate-800/60 py-4 text-center text-[10px] text-slate-500">
          © {new Date().getFullYear()} ShortVideo Hub Indonesia. Hak Cipta Dilindungi.
        </div>
      </footer>

    </div>
  );
}


// --- REUSABLE VIDEO CARD COMPONENT ---
function VideoCard({ video, isFav, onToggleFav, onOpenModal, onDownload }) {
  return (
    <div 
      onClick={onOpenModal}
      className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-violet-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer flex flex-col justify-between"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[9/16] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
            {video.resolution}
          </span>

          <button
            onClick={onToggleFav}
            className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-red-400 transition-colors"
            title="Tambah ke Favorit"
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Play Preview Center Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-11 h-11 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-lg shadow-violet-600/40 scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-white" />
          </div>
        </div>

        {/* Bottom Metadata Info */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
            <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-semibold">
              {video.orientation === 'vertical' ? '9:16' : '16:9'}
            </span>
            <span>•</span>
            <span>{video.duration}</span>
          </div>
          <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-violet-300 transition-colors">
            {video.title}
          </h3>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <span className="text-[10px] text-green-400 font-medium truncate">
          ✓ {video.license}
        </span>

        <button
          onClick={onDownload}
          className="p-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white transition-all text-[11px] font-semibold flex items-center gap-1"
          title="Unduh Video"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Unduh</span>
        </button>
      </div>

    </div>
  );
}