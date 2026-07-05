import mestaImage from '../assets/mesta.png';
import neaMoniImage from '../assets/nea_moni.png';
import pyrgiImage from '../assets/pyrgi.png';
import anavatosImage from '../assets/anavatos.png';
import mavraVoliaImage from '../assets/mavra_volia.png';
import agiaDynamiImage from '../assets/agia_dynami.png';
import masticMuseumImage from '../assets/museum_mastsic.png';
import nauticalMuseumImage from '../assets/museum_nautical.png';
import agiaFotiaImage from '../assets/agia_fotia.png';
import agiaMarkellaImage from '../assets/agia_markella.png';
import karfasImage from '../assets/karfas.png';
import komiImage from '../assets/komi.png';
import lagadaImage from '../assets/lagada.png';
import emporiosImage from '../assets/emporios.png';
import nagosImage from '../assets/nagos.png';
import mpahariImage from '../assets/mpahari.png';
import carrefourImage from '../assets/carrefour.png';
import pharmacyImage from '../assets/pharmacy.png';
import kentrikoImage from '../assets/kentriko.png';
import suenoImage from '../assets/sueno.png';
import mastihaShopImage from '../assets/mastihashop.png';

// Fallback images if specific ones don't exist
const placeholderImage = 'https://images.unsplash.com/photo-1596324121712-5bbc14482174?auto=format&fit=crop&q=80&w=600';

export const AIRBNB_LOCATION = {
  id: 'home',
  title: 'Chios Getaway Airbnb',
  address: 'Stefanou Tsouri 69 (Tsouri 69), Chios Town, 82100',
  coordinates: [38.3678, 26.1361],
};

export const MUST_VISIT_SPOTS = [
  // Spots
  {
    id: 'spot-1',
    title: { en: 'Nea Moni Monastery', el: 'Νέα Μονή', tr: 'Nea Moni Manastırı' },
    description: { 
      en: 'An 11th-century Byzantine monastery and UNESCO World Heritage site known for its mosaics.',
      el: 'Βυζαντινό μοναστήρι του 11ου αιώνα, Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO, διάσημο για τα ψηφιδωτά του.',
      tr: '11. yüzyıldan kalma bir Bizans manastırı ve mozaikleriyle ünlü UNESCO Dünya Mirası alanı.'
    },
    type: 'spot',
    coordinates: [38.3736, 26.0560],
    image: neaMoniImage,
  },
  {
    id: 'spot-2',
    title: { en: 'Pyrgi Village', el: 'Πυργί', tr: 'Pyrgi Köyü' },
    description: {
      en: 'Famous for its intricately painted geometric patterns (xysta) on the building facades.',
      el: 'Διάσημο για τα περίπλοκα γεωμετρικά μοτίβα (ξυστά) στις προσόψεις των κτιρίων.',
      tr: 'Binaların cephelerindeki karmaşık boyalı geometrik desenleriyle (xysta) ünlüdür.'
    },
    type: 'spot',
    coordinates: [38.2268, 25.9984],
    image: pyrgiImage,
  },
  {
    id: 'spot-3',
    title: { en: 'Mesta', el: 'Μεστά', tr: 'Mesta' },
    description: {
      en: 'A beautifully preserved medieval mastic village with labyrinthine stone streets.',
      el: 'Ένα καλοδιατηρημένο μεσαιωνικό Μαστιχοχώρι με δαιδαλώδη πέτρινα δρομάκια.',
      tr: 'Labirent gibi taş sokakları olan, güzelce korunmuş bir ortaçağ sakız köyü.'
    },
    type: 'spot',
    coordinates: [38.2587, 25.9392],
    image: mestaImage,
  },
  {
    id: 'spot-4',
    title: { en: 'Anavatos', el: 'Ανάβατος', tr: 'Anavatos' },
    description: {
      en: 'A hauntingly beautiful abandoned medieval settlement built on a conical cliff.',
      el: 'Ένας εντυπωσιακός εγκαταλελειμμένος μεσαιωνικός οικισμός χτισμένος σε κωνικό βράχο.',
      tr: 'Konik bir uçurumun üzerine inşa edilmiş, unutulmaz güzellikte terk edilmiş bir ortaçağ yerleşimi.'
    },
    type: 'spot',
    coordinates: [38.3951, 26.0125],
    image: anavatosImage,
  },

  // Museums
  {
    id: 'spot-15',
    title: { en: 'Chios Mastic Museum', el: 'Μουσείο Μαστίχας Χίου', tr: 'Sakız Müzesi' },
    description: {
      en: 'A state-of-the-art museum showcasing the agricultural history and production of mastic on the island.',
      el: 'Ένα υπερσύγχρονο μουσείο που προβάλλει την αγροτική ιστορία και την παραγωγή της μαστίχας στο νησί.',
      tr: 'Adadaki sakızın tarımsal tarihini ve üretimini sergileyen son teknoloji ürünü bir müze.'
    },
    type: 'museum',
    coordinates: [38.2323, 26.0245],
    image: masticMuseumImage,
  },
  {
    id: 'spot-16',
    title: { en: 'Nautical Museum of Chios', el: 'Ναυτικό Μουσείο Χίου', tr: 'Sakız Denizcilik Müzesi' },
    description: {
      en: 'Housed in a neoclassical mansion, this museum chronicles the island\'s rich maritime history and traditions.',
      el: 'Στεγάζεται σε ένα νεοκλασικό αρχοντικό και εξιστορεί την πλούσια ναυτική ιστορία και τις παραδόσεις του νησιού.',
      tr: 'Neoklasik bir konakta yer alan bu müze, adanın zengin denizcilik tarihini ve geleneklerini anlatmaktadır.'
    },
    type: 'museum',
    coordinates: [38.3685, 26.1365],
    image: nauticalMuseumImage,
  },

  // Beaches
  {
    id: 'spot-5',
    title: { en: 'Mavra Volia', el: 'Μαύρα Βόλια', tr: 'Mavra Volia' },
    description: {
      en: 'A stunning beach famous for its smooth black volcanic pebbles and deep blue waters.',
      el: 'Μια εκπληκτική παραλία διάσημη για τα λεία μαύρα ηφαιστειακά βότσαλα και τα βαθιά γαλάζια νερά της.',
      tr: 'Pürüzsüz siyah volkanik çakıl taşları ve masmavi sularıyla ünlü çarpıcı bir plaj.'
    },
    type: 'beach',
    coordinates: [38.1882, 26.0270],
    image: mavraVoliaImage,
  },
  {
    id: 'spot-17',
    title: { en: 'Agia Dynami Beach', el: 'Παραλία Αγία Δύναμη', tr: 'Agia Dynami Plajı' },
    description: {
      en: 'A hidden gem with stunning turquoise waters and white pebbles, offering a peaceful and beautiful escape.',
      el: 'Ένα κρυμμένο στολίδι με εκπληκτικά γαλαζοπράσινα νερά και λευκά βότσαλα, προσφέροντας μια γαλήνια απόδραση.',
      tr: 'Huzurlu ve güzel bir kaçış sunan, çarpıcı turkuaz suları ve beyaz çakıl taşları ile gizli bir mücevher.'
    },
    type: 'beach',
    coordinates: [38.2147, 25.9136],
    image: agiaDynamiImage,
  },
  {
    id: 'beach-komi',
    title: { en: 'Komi Beach', el: 'Παραλία Κώμη', tr: 'Komi Plajı' },
    description: {
      en: 'A popular long sandy beach, offering both fully organized sections with sunbeds and quieter unorganized spots.',
      el: 'Μια δημοφιλής μεγάλη αμμώδης παραλία, με οργανωμένα τμήματα με ξαπλώστρες και πιο ήσυχα, μη οργανωμένα σημεία.',
      tr: 'Şezlonglu tam organize bölümleri ve daha sessiz organize olmayan noktalarıyla popüler uzun bir kumsal.'
    },
    type: 'beach',
    coordinates: [38.2045, 26.0456],
    image: komiImage,
  },
  {
    id: 'beach-karfas',
    title: { en: 'Karfas Beach', el: 'Παραλία Καρφάς', tr: 'Karfas Plajı' },
    description: {
      en: 'A beautiful sandy beach with warm shallow waters. Ideal for families with children.',
      el: 'Όμορφη αμμώδης παραλία με ζεστά ρηχά νερά. Ιδανική για οικογένειες με παιδιά.',
      tr: 'Sıcak sığ suları olan güzel bir kumsal. Çocuklu aileler için ideal.'
    },
    type: 'beach',
    coordinates: [38.3150, 26.1432],
    image: karfasImage,
  },
  {
    id: 'beach-agia-fotia',
    title: { en: 'Agia Fotia Beach', el: 'Παραλία Αγία Φωτιά', tr: 'Agia Fotia Plajı' },
    description: {
      en: 'A popular pebbled beach with clear waters, surrounded by lush green hills.',
      el: 'Δημοφιλής παραλία με βότσαλο και καθαρά νερά, περιτριγυρισμένη από καταπράσινους λόφους.',
      tr: 'Yemyeşil tepelerle çevrili, berrak suları olan popüler bir çakıllı plaj.'
    },
    type: 'beach',
    coordinates: [38.2814, 26.1466],
    image: agiaFotiaImage,
  },
  {
    id: 'beach-agia-markella',
    title: { en: 'Agia Markella Beach', el: 'Παραλία Αγίας Μαρκέλλας', tr: 'Agia Markella Plajı' },
    description: {
      en: 'A beautiful beach located next to the historic monastery of Agia Markella, known for its deep cool waters.',
      el: 'Μια όμορφη παραλία δίπλα στο ιστορικό μοναστήρι της Αγίας Μαρκέλλας, γνωστή για τα βαθιά δροσερά νερά της.',
      tr: 'Tarihi Agia Markella manastırının yanında yer alan, derin serin sularıyla bilinen güzel bir plaj.'
    },
    type: 'beach',
    coordinates: [38.4900, 25.8992],
    image: agiaMarkellaImage,
  },
  {
    id: 'beach-south',
    title: { en: 'Emporios', el: 'Εμπορειός', tr: 'Emporios' },
    description: {
      en: 'Explore the stunning volcanic beach and beautiful coastal spots in this famous southern part of the island.',
      el: 'Εξερευνήστε την εκπληκτική ηφαιστειακή παραλία και τα όμορφα παραθαλάσσια σημεία σε αυτό το διάσημο νότιο τμήμα του νησιού.',
      tr: 'Adanın bu ünlü güney kesimindeki çarpıcı volkanik plajı ve güzel sahil noktalarını keşfedin.'
    },
    type: 'beach',
    coordinates: [38.1882, 26.0270],
    image: emporiosImage,
  },
  {
    id: 'beach-north',
    title: { en: 'Nagos', el: 'Ναγός', tr: 'Nagos' },
    description: {
      en: 'Discover the wilder, lush green landscape and crystal clear pebble beach of Nagos in Northern Chios.',
      el: 'Ανακαλύψτε το πιο άγριο, καταπράσινο τοπίο και την κρυστάλλινη παραλία με βότσαλο του Ναγού στη Βόρεια Χίο.',
      tr: 'Kuzey Sakız\'daki Nagos\'un daha vahşi, yemyeşil manzarasını ve kristal berraklığındaki çakıllı plajını keşfedin.'
    },
    type: 'beach',
    coordinates: [38.5600, 26.0600],
    image: nagosImage,
  },

  // Restaurants
  {
    id: 'rest-kentriko',
    title: { en: 'Kentriko', el: 'Κεντρικό', tr: 'Kentriko' },
    description: {
      en: 'A traditional dining spot offering authentic Greek flavors and local specialties in a cozy atmosphere.',
      el: 'Ένα παραδοσιακό εστιατόριο που προσφέρει αυθεντικές ελληνικές γεύσεις και τοπικές σπεσιαλιτέ σε μια ζεστή ατμόσφαιρα.',
      tr: 'Rahat bir atmosferde otantik Yunan lezzetleri ve yerel spesiyaliteler sunan geleneksel bir yemek mekanı.'
    },
    type: 'restaurant',
    coordinates: [38.3680, 26.1365],
    image: kentrikoImage,
  },
  {
    id: 'rest-mpahari',
    title: { en: 'Mpahari', el: 'Μπαχάρι', tr: 'Mpahari' },
    description: {
      en: 'Known for its excellent Mediterranean cuisine, blending traditional recipes with modern touches.',
      el: 'Γνωστό για την εξαιρετική μεσογειακή κουζίνα του, συνδυάζοντας παραδοσιακές συνταγές με σύγχρονες πινελιές.',
      tr: 'Geleneksel tarifleri modern dokunuşlarla harmanlayan mükemmel Akdeniz mutfağıyla bilinir.'
    },
    type: 'restaurant',
    coordinates: [38.3690, 26.1380],
    image: mpahariImage,
  },
  {
    id: 'spot-lagada',
    title: { en: 'Lagada', el: 'Λαγκάδα', tr: 'Lagada' },
    description: {
      en: 'A picturesque fishing village famous for its seafood tavernas like O Pasas. It is also the departure point for the water taxi to Oinousses island!',
      el: 'Γραφικό ψαροχώρι φημισμένο για τις ψαροταβέρνες του όπως ο Πασάς. Από εδώ αναχωρεί και το θαλάσσιο ταξί για τις Οινούσσες!',
      tr: 'O Pasas gibi deniz ürünleri tavernasıyla ünlü pitoresk bir balıkçı köyü. Ayrıca Oinousses adasına giden su taksisinin kalkış noktasıdır!'
    },
    type: 'spot',
    coordinates: [38.4800, 26.1250],
    image: lagadaImage,
  },

  // Amenities
  {
    id: 'amenity-supermarket',
    title: { en: '24/7 Supermarket', el: '24/7 Σούπερ Μάρκετ', tr: '24/7 Süpermarket' },
    description: {
      en: 'Convenient 24/7 supermarket for all your essential needs, anytime of the day or night.',
      el: 'Βολικό 24/7 σούπερ μάρκετ για όλες τις βασικές σας ανάγκες, οποιαδήποτε ώρα της ημέρας ή της νύχτας.',
      tr: 'Günün veya gecenin her saatinde tüm temel ihtiyaçlarınız için uygun 24/7 süpermarket.'
    },
    type: 'amenity',
    coordinates: [38.3650, 26.1350],
    image: carrefourImage,
  },
  {
    id: 'amenity-pharmacy',
    title: { en: 'Nearby Pharmacies', el: 'Κοντινά Φαρμακεία', tr: 'Yakındaki Eczaneler' },
    description: {
      en: 'Local pharmacies for medical supplies and health advice.',
      el: 'Τοπικά φαρμακεία για ιατρικές προμήθειες και συμβουλές υγείας.',
      tr: 'Tıbbi malzemeler ve sağlık tavsiyeleri için yerel eczaneler.'
    },
    type: 'amenity',
    coordinates: [38.3660, 26.1340],
    image: pharmacyImage,
  },
  {
    id: 'amenity-cafe',
    title: { en: 'Sueno Cafe', el: 'Sueno Καφέ', tr: 'Sueno Cafe' },
    description: {
      en: 'A fantastic cafe bar located right on the Chios harbor waterfront, perfect for a morning coffee or an evening drink.',
      el: 'Ένα φανταστικό καφέ-μπαρ ακριβώς στο λιμάνι της Χίου, ιδανικό για πρωινό καφέ ή βραδινό ποτό.',
      tr: 'Sabah kahvesi veya akşam içkisi için mükemmel, Sakız limanı sahilinde yer alan harika bir kafe bar.'
    },
    type: 'amenity',
    coordinates: [38.3718, 26.1378],
    image: suenoImage,
  },

  // Mastic Shops
  {
    id: 'mastic-shop',
    title: { en: 'Mastiha Shop', el: 'Mastiha Shop', tr: 'Mastiha Shop' },
    description: {
      en: 'The official store offering a wide variety of authentic Chios Mastic products, from cosmetics to sweets, located at the harbor.',
      el: 'Το επίσημο κατάστημα που προσφέρει μεγάλη ποικιλία αυθεντικών προϊόντων μαστίχας Χίου, από καλλυντικά μέχρι γλυκά, στο λιμάνι.',
      tr: 'Liman bölgesinde yer alan, kozmetikten tatlılara kadar çok çeşitli otantik Sakız Sakızı ürünleri sunan resmi mağaza.'
    },
    type: 'mastic',
    coordinates: [38.3705, 26.1385],
    image: mastihaShopImage,
  }
];
