Znači, glavnaFunkcija() se poziva svakim klikom botuna. Ima 4 moguća scenarija:

1. Ako je text botuna "Započni igru" generiraju se krugovi, promjeni se text botuna na „provjeri rezultat“, pokrene se brojacvremena i promijeni se text paragrapha.

2. Ako je text botuna „Provjeri rezultat“ odvija onda se pozivaju dvije funkcije. provjeriKrugove(generiraniKrugovi) i trenutnoStanje(trenutnaProvjera).
to smo mogli napraviti sve pozivom jedne funkcije trenutnoStanje(provjeriKrugove(generiraniKrugovi).
Funkcija provjeriKrugove() provjerava jesu li krugovi u boxovima i vraća true ili false.
Funkcija trenutnoStanje(true,ili false). namješta text botuna ovisno o true ili false. Ako je true onda ides na drugi nivo ako je false onda pokušaj ponovno 

3. Ako je text botuna „Pokušaj ponovno“ reloadamo page

4. ako je text botuna „Bravo prošao si {nivo}. nivo“ onda idemo na sljedeci lvl kreiraju se novi krugovi ovisno o nivo odnosno o indexu u arrayu brojKurogvaNivo,
text botuna postavimo na „provjeri rezultat" i krenemo odbrojavanje
