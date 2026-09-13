
function rechercher() {
    var input = document.getElementById("searchInput");
    if (!input) return;

    var texte = input.value.toLowerCase();
    var cartes = document.querySelectorAll(".search-card");

    for (var i = 0; i < cartes.length; i++) {
        var contenu = cartes[i].textContent.toLowerCase();
        cartes[i].style.display = contenu.includes(texte) ? "" : "none";
    }
}

async function appliquerCoupon() {
    var codeElement = document.getElementById("coupon");
    var message = document.getElementById("couponMessage");

    if (!codeElement || !message) return;

    var code = codeElement.value.trim().toUpperCase();

    if (!window.blckyzSupabase) {
        message.textContent = "Configurez Supabase pour utiliser les coupons.";
        return;
    }

    if (!code) {
        message.textContent = "Entrez un code promo.";
        return;
    }

    var resultat = await window.blckyzSupabase
        .from("coupons")
        .select("code, discount, expiration_date, max_uses, used_count")
        .eq("code", code)
        .eq("active", true)
        .maybeSingle();

    if (resultat.error || !resultat.data) {
        message.textContent = "Coupon invalide.";
        return;
    }

    var coupon = resultat.data;
    var expire = coupon.expiration_date && new Date(coupon.expiration_date) < new Date();
    var limite = coupon.max_uses !== null && coupon.used_count >= coupon.max_uses;

    if (expire || limite) {
        message.textContent = "Coupon expiré ou inutilisable.";
        return;
    }

    message.textContent = "Coupon accepté : -" + coupon.discount + " %";
}

async function chargerSession() {
    if (!window.blckyzSupabase) return;

    var resultat = await window.blckyzSupabase.auth.getUser();
    var lien = document.querySelector(".account-link");

    if (lien && resultat.data && resultat.data.user) {
        lien.textContent = "Mon compte";
    }
}

document.addEventListener("DOMContentLoaded", chargerSession);
