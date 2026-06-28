Feature: Sistem konfigürasyonu sorgulama
  Belirtilen sayfada alanılara değer girilip sorgulama yapılmasını test eder.

  Scenario: Parametre adı girilerek sorgulama yapılması
    Given kullanıcı "http://172.16.11.154:9001/mars/app/main" sayfasını açar
    When Kullanıcı adı alanına "innova", şifre alanına "123456", captcha alanına "mars" yazar
    And Enter tuşuna basar
    And Ekranda "Sistem Yönetimi" yazısını görene kadar bekler
    And "Sistem yönetimi" menüsünden "Sistem Konfigürasyonu" ekranını açar
    And "Parametre Adı" textbox alanına "otomasyon parametresi" yazar
    And "Sorgula" butonuna tıklar
    Then Sistem Konfigürasyonu Listesi altında "otomasyon parametresi" listelendiği görülür
    Then "Toplam kayıt sayısı : 1" mesajının ekranda görüldüğü doğrulanır

    Scenario: Parametre kodu girilerek sorgulama yapılması
    Given kullanıcı "http://172.16.11.154:9001/mars/app/main" sayfasını açar
    When Kullanıcı adı alanına "innova", şifre alanına "123456", captcha alanına "mars" yazar
    And Enter tuşuna basar
    And Ekranda "Sistem Yönetimi" yazısını görene kadar bekler
    And "Sistem yönetimi" menüsünden "Sistem Konfigürasyonu" ekranını açar
    And "Parametre Kodu" textbox alanına "OTOMASYON_S" yazar
    And "Sorgula" butonuna tıklar
    Then Sistem Konfigürasyonu Listesi altında "otomasyon parametresi" listelendiği görülür
    Then "Toplam kayıt sayısı : 1" mesajının ekranda görüldüğü doğrulanır