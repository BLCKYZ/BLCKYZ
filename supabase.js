
(function () {
    var url = window.SUPABASE_URL;
    var key = window.SUPABASE_KEY;

    window.blckyzSupabase = null;

    if (url && key && window.supabase) {
        window.blckyzSupabase = window.supabase.createClient(url, key);
    }

    window.supabasePret = function () {
        return window.blckyzSupabase !== null;
    };

    window.afficherMessage = function (elementId, texte, erreur) {
        var element = document.getElementById(elementId);
        if (!element) return;
        element.textContent = texte;
        element.className = erreur ? "message erreur" : "message";
    };
})();
