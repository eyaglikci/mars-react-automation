Feature: Sistem konfigürasyonu sorgulama ve yeni kayıt
  Belirtilen sayfada alanılara değer girilip sorgulama yapılmasını test eder.

  Scenario: Sistem konfigürasyonu sorgulama yapılması
    Given kullanıcı "http://172.16.11.154:9001/mars/app/main" sayfasını açar
    When Kullanici adi alanina "innova", sifre alanina "123456", captcha alanina "mars" yazar
    And Enter tuşuna basar
    And Ekranda "Sistem Yönetimi" yazısını görene kadar bekler
    And "Sistem yönetimi" menüsünden "Sistem Konfigürasyonu" ekranını açar
    And "Parametre Adı" textbox alanına "otomasyon parametresi" yazar
    And "Sorgula" butonuna tıklar
    Then Sistem Konfigürasyonu Listesi altında "otomasyon parametresi" listelendiği görülür
    Then "Toplam kayıt sayısı : 1" mesajının ekranda görüldüğü doğrulanır
    And "Temizle" butonuna tıklar
    And "Parametre Kodu" textbox alanına "OTOMASYON_S" yazar
    And "Sorgula" butonuna tıklar
    Then Sistem Konfigürasyonu Listesi altında "otomasyon parametresi" listelendiği görülür
    Then "Toplam kayıt sayısı : 1" mesajının ekranda görüldüğü doğrulanır
    And "Temizle" butonuna tıklar
    And "Parametre Değeri" textbox alanına "otomasyon" yazar
    And "Sorgula" butonuna tıklar
    Then Sistem Konfigürasyonu Listesi altında "otomasyon parametresi" listelendiği görülür
    Then "Toplam kayıt sayısı : 1" mesajının ekranda görüldüğü doğrulanır
    And "Temizle" butonuna tıklar
    And "Parametre Adı" textbox alanına "pas" yazar
    And "Durum" combobox alanında Pasif seçmek için "p" ye ve entera basar
    And "Sorgula" butonuna tıklar
    Then Sistem Konfigürasyonu Listesi altında "otomasyon parametresi" listelendiği görülür
    Then "Toplam kayıt sayısı : 1" mesajının ekranda görüldüğü doğrulanır
    


