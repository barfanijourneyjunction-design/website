// ==========================================
// Barfānī Journey Junction - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // --- Active nav link on scroll ---
    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function () {
        handleNavScroll();
        updateActiveLink();
        handleBackToTop();
    });

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
        });
    });

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight;
                const top = target.offsetTop - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // --- Back to Top ---
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Testimonials Slider ---
    const track = document.getElementById('testimonialsTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    let visibleCards = getVisibleCards();

    function getVisibleCards() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }

    function totalSlides() {
        return Math.max(1, cards.length - visibleCards + 1);
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        for (var i = 0; i < totalSlides(); i++) {
            var dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.dataset.index = i;
            dot.addEventListener('click', function () {
                goToSlide(parseInt(this.dataset.index));
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides() - 1));
        var cardWidth = cards[0].offsetWidth;
        var gap = 24;
        track.style.transform = 'translateX(-' + (currentSlide * (cardWidth + gap)) + 'px)';
        dotsContainer.querySelectorAll('.dot').forEach(function (d, i) {
            d.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', function () {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function () {
        goToSlide(currentSlide + 1);
    });

    // Auto-advance testimonials
    var autoSlideInterval = setInterval(function () {
        if (currentSlide >= totalSlides() - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', function () {
        clearInterval(autoSlideInterval);
    });

    track.addEventListener('mouseleave', function () {
        autoSlideInterval = setInterval(function () {
            if (currentSlide >= totalSlides() - 1) {
                goToSlide(0);
            } else {
                goToSlide(currentSlide + 1);
            }
        }, 5000);
    });

    window.addEventListener('resize', function () {
        visibleCards = getVisibleCards();
        buildDots();
        goToSlide(Math.min(currentSlide, totalSlides() - 1));
    });

    buildDots();

    // --- Contact Form ---
    var contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(contactForm);
        var data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });

        // Show success message
        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Enquiry Sent! We\'ll contact you soon.';
        btn.disabled = true;
        btn.style.background = '#2d5a1e';

        setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = '';
            contactForm.reset();
        }, 4000);
    });

    // --- Scroll animations ---
    var animateElements = document.querySelectorAll(
        '.about-content, .about-image, .package-card, .destination-card, ' +
        '.advantage-card, .testimonial-card, .blog-card, .ps-column, .info-card'
    );

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateElements.forEach(function (el) {
        el.classList.add('animate-target');
        observer.observe(el);
    });

    // Init
    handleNavScroll();
});

// --- Blog Modal ---
var blogPosts = [
    {
        title: 'Complete ChĀr DhĀm YĀtrĀ Guide for First-Time Pilgrims',
        category: 'Travel Guide',
        content: '<h3>Planning Your First Chār Dhām Yātrā</h3>' +
            '<p>The Chār Dhām Yātrā is one of the most sacred pilgrimage circuits in Hinduism, encompassing four holy shrines in the Garhwal Himalayas of Uttarākhaṇḍ: Badrīnāth, Kedārnāth, Gaṅgotrī, and Yamunotrī. For first-time pilgrims, proper planning can make the difference between a spiritually enriching experience and a challenging ordeal.</p>' +
            '<h4>Best Time to Visit</h4>' +
            '<p>The Chār Dhām temples open between April-May and close in October-November, depending on weather conditions. The ideal months are <strong>May-June</strong> and <strong>September-October</strong>. July-August brings monsoon rains, which can cause landslides and road closures. The portals\' opening and closing dates are decided based on the Hindu calendar and announced by temple committees.</p>' +
            '<h4>Recommended Itinerary</h4>' +
            '<p>A typical Chār Dhām Yātrā takes <strong>9-10 days</strong> when well-organized. The traditional route starts from Haridvār/Ṛṣīkeś and follows this sequence:</p>' +
            '<ol><li><strong>Day 1-2:</strong> Departure city to Yamunotrī via Barkot</li>' +
            '<li><strong>Day 3:</strong> Yamunotrī darśan and trek (6 km each way)</li>' +
            '<li><strong>Day 4:</strong> Travel to Uttarkāśī (en route to Gaṅgotrī)</li>' +
            '<li><strong>Day 5:</strong> Gaṅgotrī darśan and return</li>' +
            '<li><strong>Day 6:</strong> Travel to Guptkashi/Sitapur (for Kedārnāth)</li>' +
            '<li><strong>Day 7:</strong> Kedārnāth trek (16 km) or helicopter ride</li>' +
            '<li><strong>Day 8:</strong> Kedārnāth darśan, return trek</li>' +
            '<li><strong>Day 9:</strong> Travel to Badrīnāth</li>' +
            '<li><strong>Day 10:</strong> Badrīnāth darśan and return journey</li></ol>' +
            '<h4>What to Pack</h4>' +
            '<ul><li>Warm layers (temperatures drop below 5°C at higher altitudes)</li>' +
            '<li>Sturdy, comfortable walking shoes with good grip</li>' +
            '<li>Rain jacket and umbrella</li>' +
            '<li>Personal medications and a basic first-aid kit</li>' +
            '<li>Sunscreen, sunglasses, and a hat</li>' +
            '<li>Reusable water bottle and energy snacks</li>' +
            '<li>Valid ID proof (mandatory for registration)</li>' +
            '<li>Lightweight backpack for daily treks</li></ul>' +
            '<h4>Physical Preparation</h4>' +
            '<p>Start a walking routine at least 4-6 weeks before the yātrā. Aim for 5-8 km daily walks, gradually increasing the distance. The Kedārnāth trek (16 km one way) and Yamunotrī trek (6 km one way) require moderate fitness. If you have health conditions, consult your doctor before planning.</p>' +
            '<h4>Why Choose an Organized Tour?</h4>' +
            '<p>An organized batch tour with Barfānī Journey Junction eliminates the stress of planning logistics in remote mountain areas. From pre-booked accommodations and transport to experienced guides and 24/7 support, every detail is handled so you can focus entirely on the spiritual experience.</p>'
    },
    {
        title: 'Health Tips for High-Altitude Pilgrimage in UttarĀkhaṆḌ',
        category: 'Health & Safety',
        content: '<h3>Staying Healthy at High Altitudes</h3>' +
            '<p>The Chār Dhām temples are situated at elevations ranging from 3,100m to 3,583m above sea level. At these altitudes, the air has significantly less oxygen, which can affect your body in various ways. Understanding and preparing for high-altitude conditions is essential for a safe pilgrimage.</p>' +
            '<h4>Understanding Altitude Sickness (AMS)</h4>' +
            '<p>Acute Mountain Sickness affects many pilgrims, especially those from plains and coastal areas. Symptoms include:</p>' +
            '<ul><li>Headache and dizziness</li>' +
            '<li>Nausea and loss of appetite</li>' +
            '<li>Shortness of breath during mild exertion</li>' +
            '<li>Difficulty sleeping</li>' +
            '<li>General fatigue and weakness</li></ul>' +
            '<p><strong>Prevention:</strong> Ascend gradually, stay hydrated (3-4 litres of water daily), avoid alcohol, and don\'t over-exert on the first day at altitude.</p>' +
            '<h4>Essential Medications to Carry</h4>' +
            '<ul><li>Diamox (Acetazolamide) &mdash; for altitude sickness prevention (consult doctor)</li>' +
            '<li>Paracetamol &mdash; for headaches and mild fever</li>' +
            '<li>ORS packets &mdash; to prevent dehydration</li>' +
            '<li>Anti-nausea medication</li>' +
            '<li>Personal prescription medications (carry extra)</li>' +
            '<li>Band-aids, antiseptic cream, and blister pads</li></ul>' +
            '<h4>Dietary Tips</h4>' +
            '<p>Eat light, carbohydrate-rich meals. Avoid heavy, oily food. Drink plenty of warm fluids &mdash; ginger tea and hot water with lemon are excellent. Carry dry fruits, glucose biscuits, and energy bars for trekking days. Avoid outside water; use bottled or purified water only.</p>' +
            '<h4>Special Considerations for Elderly Pilgrims</h4>' +
            '<p>Pilgrims above 60 should get a complete health check-up before the yātrā. Those with heart conditions, severe asthma, or uncontrolled blood pressure should consult their cardiologist. Helicopter services to Kedārnāth and pony/palki rides are available for those who cannot trek.</p>' +
            '<h4>Emergency Preparedness</h4>' +
            '<p>Barfānī Journey Junction\'s on-ground coordinators carry first-aid kits and have contacts with local medical facilities. In case of emergencies, evacuation arrangements can be made quickly. Our 24/7 helpline ensures you\'re never without support during the journey.</p>'
    },
    {
        title: 'The Spiritual Significance of ChĀr DhĀm: A Sacred Circuit',
        category: 'Spiritual Insights',
        content: '<h3>Understanding the Sacred Circuit</h3>' +
            '<p>The concept of Chār Dhām (four abodes) was established by the great philosopher-saint <strong>Adi Śaṅkarācārya</strong> in the 8th century CE. He identified four sacred sites at the four cardinal points of India: Badrīnāth (North), Purī (East), Rāmeśvaram (South), and Dvārakā (West). The Choṭā Chār Dhām in Uttarākhaṇḍ &mdash; Badrīnāth, Kedārnāth, Gaṅgotrī, and Yamunotrī &mdash; became the most popular pilgrimage circuit, drawing millions of devotees annually.</p>' +
            '<h4>Badrīnāth &mdash; The Abode of Lord Viṣṇu</h4>' +
            '<p>Badrīnāth is one of the 108 Divya Desams (holy shrines of Viṣṇu). Legend says that Lord Viṣṇu was meditating here when Goddess Lakṣmī shielded him from harsh weather by taking the form of a Badri (jujube) tree. The Tapt Kund hot spring near the temple is believed to have healing properties. A visit to Badrīnāth is said to wash away all sins and bestow mokṣa (liberation).</p>' +
            '<h4>Kedārnāth &mdash; The Seat of Lord Śiva</h4>' +
            '<p>Kedārnāth houses one of the twelve <strong>Jyotirliṅgas</strong>, the highest and most sacred. According to the Mahābhārata, the Pāṇḍavas sought Lord Śiva\'s forgiveness here after the Kurukṣetra war. Lord Śiva, avoiding them, took the form of a bull and dove into the earth, leaving behind his hump-shaped back, which is now worshipped as the Kedārnāth Jyotirliṅga. The remaining parts appeared at four other locations, collectively known as the <strong>Pañca Kedār</strong>.</p>' +
            '<h4>Gaṅgotrī &mdash; Where Gaṅgā Descended</h4>' +
            '<p>Gaṅgotrī marks the mythological origin of the River Gaṅgā. King Bhagīratha performed intense penance here to bring Goddess Gaṅgā from heaven to earth to liberate the souls of his 60,000 ancestors. Lord Śiva caught the mighty river in his matted locks to prevent the force of her descent from destroying the earth. The Bhāgīrathī River, originating from the Gaumukh glacier 19 km upstream, is considered the true source of the Gaṅgā.</p>' +
            '<h4>Yamunotrī &mdash; The Source of Yamunā</h4>' +
            '<p>Yamunotrī is dedicated to Goddess Yamunā, the daughter of Sun God (Surya) and sister of Yama (God of Death). Bathing in the Yamunā is believed to protect devotees from untimely death. The temple features the sacred <strong>Sūrya Kuṇḍ</strong>, a hot spring where pilgrims cook rice and potatoes in muslin cloth to offer as prasād. The Divya Śilā (divine rock) near the temple is worshipped before entering the shrine.</p>' +
            '<h4>The Journey as Transformation</h4>' +
            '<p>The Chār Dhām Yātrā is not merely a physical journey &mdash; it is a spiritual transformation. The challenging terrain, the extreme weather, the physical exertion &mdash; all serve as a form of tapas (austerity). By the time a pilgrim completes the circuit, they have been tested, purified, and transformed. This is why the yātrā has remained one of the most important pilgrimages for over a millennium.</p>'
    }
];

function openBlogModal(index) {
    var post = blogPosts[index];
    var modal = document.getElementById('blogModal');
    var body = document.getElementById('blogModalBody');
    body.innerHTML = '<span class="blog-modal-category">' + post.category + '</span>' +
        '<h2>' + post.title + '</h2>' + post.content;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('blogModalClose').addEventListener('click', function () {
    document.getElementById('blogModal').classList.remove('open');
    document.body.style.overflow = '';
});

document.getElementById('blogModal').addEventListener('click', function (e) {
    if (e.target === this) {
        this.classList.remove('open');
        document.body.style.overflow = '';
    }
});

// Close modal on Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.getElementById('blogModal').classList.remove('open');
        document.body.style.overflow = '';
    }
});
