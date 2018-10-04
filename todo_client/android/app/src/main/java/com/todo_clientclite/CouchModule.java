package com.todo_clientclite;

import android.util.Log;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

import com.couchbase.lite.Database;
import com.couchbase.lite.Document;
import com.couchbase.lite.CouchbaseLiteException;
import com.couchbase.lite.DatabaseConfiguration;
import com.couchbase.lite.MutableDocument;

import com.facebook.react.bridge.Promise;

import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.Date;
import java.util.Map;

public class CouchModule extends ReactContextBaseJavaModule{

    private static Database database = null;

    private static String DBName = "test";

    public CouchModule(ReactApplicationContext reactContext){
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CouchModule";
    }

    @ReactMethod
    public void createDatabase(String dbName)throws CouchbaseLiteException{
        DatabaseConfiguration configs = new DatabaseConfiguration(getReactApplicationContext());
        database = new Database(dbName, configs);

        Log.d("couchb", "Database created");
    }

    /**
    * Opens a Database
    *   If doesn't exist sends a Promise
    * **/
    @ReactMethod
    public void openDatabase(String dbName) throws CouchbaseLiteException, URISyntaxException{
        // return if database is alredy open
        if (database != null){
            return;
        }

        this.createDatabase(dbName);
    }

    /**
    * Creates a dummy document 
    * **/
    @ReactMethod
    public void createDocument(String data, Promise promise){
        // Data parsing is not set yet
        if (database == null){
            try {
                this.openDatabase(DBName);
            } catch (Exception e){
                promise.reject("100", e);
                return;
            }
        }

        MutableDocument newDocument = new MutableDocument();

        newDocument.setString("owner", "todo");
        newDocument.setValue("createdAt", new Date());

        try{
            database.save(newDocument);
            Log.d("couchb", "Saved the document");
            promise.resolve(newDocument);
        }catch(CouchbaseLiteException e){
            promise.reject("101", e);
        }catch (Exception e){
            promise.reject("102", e);
        }
    }

    /**
    * Gets a document matched with the parsed id
    * **/
    @ReactMethod
    public void getDocument(String id, Promise promise){
        if (database == null){
            try {
                this.openDatabase(DBName);
            }catch (Exception e){
                promise.reject("100", e);
                return;
            }
        }

        try {
            Document document = database.getDocument(id);

            if (document == null){
                promise.reject("103", "Document does not exist or deleted");
                return;
            }

            Map<String, Object> stringObjectMap = document.toMap();
            JSONObject response = new JSONObject(stringObjectMap);
            promise.resolve(response.toString());

            Log.d("couchb", "Sending response of found document via promise");
        }catch (Exception e){
            promise.reject("101", e);
        }

    }


}
